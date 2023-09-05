const ld = require("launchdarkly-node-server-sdk");
const { FileDataSource } = require("launchdarkly-node-server-sdk/integrations");

const user = {
  key: "123"
};

async function fetchFlags() {
  const initOptions = {
    updateProcessor: FileDataSource({
      paths: ["./local-flags.json"],
      autoUpdate: false
    })
  };
  const client = ld.init("{sdk_key}", initOptions);
  client.once("ready", async () => {
    const responseWithoutClientSideOption = await client.allFlagsState(user);
    const responseWithClientSideOption = await client.allFlagsState(user, { clientSideOnly: true });

    console.log(responseWithoutClientSideOption.toJSON());
    console.log(responseWithClientSideOption.toJSON());
  });
}

fetchFlags();