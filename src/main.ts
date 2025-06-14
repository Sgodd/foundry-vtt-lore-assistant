import { LoreAssistantConfig } from "./config/LoreAssistantConfig";

// Initialize the module when Foundry is ready
Hooks.once("init", async function () {
	console.log("AI Lore Assistant | Initializing...");

	LoreAssistantConfig.initSettings();
});

// Module ready hook
Hooks.once("ready", async function () {
	console.log("AI Lore Assistant | Module ready!");
});
