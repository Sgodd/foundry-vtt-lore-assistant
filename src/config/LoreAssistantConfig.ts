import { LORE_ASSISTANT_MODULE_NAME } from "./module";

export class LoreAssistantConfig extends foundry.applications.api
	.ApplicationV2 {
	static initSettings(): void {
		game.settings?.registerMenu(
			LORE_ASSISTANT_MODULE_NAME,
			"loreAssistantConfig",
			{
				name: "Lore Assistant",
				label: "Lore Assistant",
				hint: "Open the Lore Assistant configuration.",
				icon: "fa-solid fa-bars",
				type: LoreAssistantConfig,
				restricted: true,
			}
		);
	}
}
