const RPC = require("discord-rpc");
const rpc = new RPC.Client({
  transport: "ipc",
});

class DiscordRPCPlugin {
  constructor() {
    this.id = "discord-rpc";
    this.name = "Discord Rich Presence";
    this.description =
      "Adds Discord Rich Presence to Obsidian. Created by Luke Leppan";
    this.defaultOn = true;

    this.app = null;
    this.instance = null;

    this.vaultName = null;
  }

  init(app, instance) {
    this.instance = instance;

    this.vaultName = app.vault.getName();

    rpc.on("ready", () => {
      rpc.setActivity({
        details: "Idle",
        state: "Vault: " + this.vaultName,
        startTimestamp: new Date(),
        largeImageKey: "logo",
        largeImageText: "Obsidian",
      });
    });

    rpc.login({
      clientId: "763813185022197831",
    });
  }

  onEnable({ workspace }, instance) {
    instance.registerEvent(workspace.on("file-open", this.onFileOpen, this));
  }

  async onFileOpen(file) {
    rpc.setActivity({
      details: "Editing " + file.basename,
      state: "Vault: " + this.vaultName,
      startTimestamp: new Date(),
      largeImageKey: "logo",
      largeImageText: "Obsidian",
    });
  }
}

module.exports = () => new DiscordRPCPlugin();
