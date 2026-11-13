const CDP = require("chrome-remote-interface");

let clientPromise = null;

function getClient() {
  if (!clientPromise) {
    clientPromise = CDP();
  }
  return clientPromise;
}

module.exports = {
  async createTab(url, options = {}) {
    const client = await getClient();
    const { Target } = client;
    const { background = false } = options;
    const params = { url };
    if (background) params.background = true;
    return Target.createTarget(params);
  },

  async bringToFrontIfNeeded(options = {}) {
    const { background = false } = options;
    if (background) return;
    const client = await getClient();
    const { Page } = client;
    await Page.bringToFront();
  },

  async switchTab(targetId, options = {}) {
    const { background = false } = options;
    if (!background) {
      await this.bringToFrontIfNeeded({ background: false });
    }
    return targetId;
  },

  async navigate(url, options = {}) {
    const { background = false } = options;
    const client = await getClient();
    const { Page } = client;
    if (!background) {
      await Page.bringToFront();
    }
    await Page.navigate({ url });
    return url;
  },

  async autoConnect(options = {}) {
    const { background = false } = options;
    console.log("Auto-connecting to Chrome, background=" + background);
    if (background) {
      await this.createTab(\, { background: true });
    }
    return;
  },
};
