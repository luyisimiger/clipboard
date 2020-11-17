import MockAdapter from "axios-mock-adapter"
import api from "@/services/index"

const mock = new MockAdapter(api);

mock.onPost("/clip/create").reply(200, { uuid: "eeK", text: "" });

mock.onPost("/clip/fetch").reply(200, { uuid: "eeK", text: "hello world!" });

mock.onPost("/clip/save").reply(200, config => {
    let data = config.data 
    return { ...data };
});

export default mock;