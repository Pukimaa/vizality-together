import { getModule, getAllModules } from '@vizality/webpack';
import { patch } from '@vizality/patcher';

import { Plugin } from '@vizality/entities';

const { YOUTUBE_APPLICATION_ID, POKER_NIGHT_APPLICATION_ID, FISHINGTON_APPLICATION_ID, END_GAME_APPLICATION_ID, CHESS_IN_THE_PARK_APPLICATION_ID } = getModule(["GENERIC_EVENT_EMBEDDED_APPS"], false);
const useExperiment = getAllModules(["useExperiment"], false).filter(obj => obj?.definition?.label === "Activities Experiment")[0];
const getGuild = getModule(["getGuild"], false);

const ids = [YOUTUBE_APPLICATION_ID, POKER_NIGHT_APPLICATION_ID, FISHINGTON_APPLICATION_ID, END_GAME_APPLICATION_ID, CHESS_IN_THE_PARK_APPLICATION_ID];

module.exports = class vizalityTogether extends Plugin {
    async start() {
        patch("vizality-together-region", getGuild, "getGuild", (args, res) => {
            if (res) res.region = "us-west";
            return res;
        });

        patch("vizality-together-rocket", useExperiment, "useExperiment", (args, res) => {
            if (args[0].guildId === "" || !args[0].guildId) return res;

            if (!res[0]?.enabledApplicationIds?.length) {
                res[0].enabledApplicationIds = ids;
                res[0].rtcPanelIconsOnly = true;
                res[0].showDiscordGameTooltips = true;
                res[0].useNewInviteButton = true;
            }

            return res;
        });
    }

    stop() {
        unpatchAll()
    }
};
