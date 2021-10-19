import React, { memo } from "react";

import { SwitchItem } from "@vizality/components/settings";

export default memo(({ getSetting, toggleSetting }) => {
	return (
		<div>
			<SwitchItem
				onChange={() => toggleSetting("showDev")}
				note={"Enables all dev branch of the games discord has to offer."}
				value={getSetting("showDev", false)}
			>
				Enable dev games
			</SwitchItem>

			<SwitchItem
				onChange={() => toggleSetting("showUnnamed")}
				note={"Enables all the unnamed games discord has to offer."}
				value={getSetting("showUnnamed", false)}
			>
				Enable unnamed games
			</SwitchItem>
		</div>
	);
});
