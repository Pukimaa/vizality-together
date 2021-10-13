import { getModule } from '@vizality/webpack';
import { patch, unpatch } from '@vizality/patcher';

import { Plugin } from '@vizality/entities';

const { 
	WATCH_YOUTUBE_PROD_APP_ID, 
	POKER_NIGHT_APPLICATION_ID, 
	FISHINGTON_APPLICATION_ID, 
	END_GAME_APPLICATION_ID 
} = getModule(["WATCH_YOUTUBE_PROD_APP_ID"], false);

const Activities = getModule(["getEnabledAppIds"], false);

module.exports = class VizalityTogether extends Plugin {
    async start() {	   
	patch("vizality-together-ids", Activities.__proto__, "getEnabledAppIds", (args, res) => {
		return [
			WATCH_YOUTUBE_PROD_APP_ID,
			POKER_NIGHT_APPLICATION_ID,
			FISHINGTON_APPLICATION_ID,
			END_GAME_APPLICATION_ID,
			// some games that i couldn't find except by manually grabbing from discordgamelab server
			"832012774040141894", // chess
			"878067389634314250", // doodle
			"879863976006127627", // word snacks
			"879863686565621790" // letter tile
		];
	});

        patch("vizality-together-rocket", Activities.__proto__, "isActivitiesEnabled", () => {
		return true;
	});
    }

    stop() {
        unpatch("vizality-together-rocket");
        unpatch("vizality-together-ids")
    }
};
