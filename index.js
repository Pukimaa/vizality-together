import { getModule } from '@vizality/webpack';
import { patch, unpatch } from '@vizality/patcher';

import { Plugin } from '@vizality/entities';

const {
	YOUTUBE_APPLICATION_ID,
	POKER_NIGHT_APPLICATION_ID,
	FISHINGTON_APPLICATION_ID,
	END_GAME_APPLICATION_ID,
	CHESS_IN_THE_PARK_APPLICATION_ID
} = getModule(["YOUTUBE_APPLICATION_ID"], false);

module.exports = class vizalityTogether extends Plugin {
    async start() {
        patch("vizality-together-region", getModule(["getGuild"], false), "getGuild", (args, res) => {
            if (res) res.region = "us-west";
            return res;
        });

        patch("vizality-together-ids", getModule(["getEnabledAppIds"], false), "getEnabledAppIds", (args, res) => {
            res = [
				YOUTUBE_APPLICATION_ID,
				POKER_NIGHT_APPLICATION_ID,
				FISHINGTON_APPLICATION_ID,
				END_GAME_APPLICATION_ID,
				CHESS_IN_THE_PARK_APPLICATION_ID
			];
			return res;
        });

        patch(
            "vizality-together-rocket",
            getModule((obj) => obj?.definition?.label == "Activities Experiment", false),
            "useExperiment",
            (args, res) => {
                if (!args[0].guildId) return res;

                if (!res[0]?.enabledApplicationIds?.length) {
                    res[0] = {
                        rtcPanelIconsOnly: true,
                        showDiscordGameTooltips: false,
                        enableActivities: true,
						useNewInviteButton: true
                    };
                }
            }
        )
    }

    stop() {
        unpatch("vizality-together-region");
        unpatch("vizality-together-rocket");
        unpatch("vizality-together-ids")
    }
};
