const inTrigger = op.inTrigger("send");
const inSocket = op.inObject("socket");
const inTopic = op.inString("topic", "main");
const inData = op.inValue("data");

const send = () =>
{
    const socket = inSocket.get();
    if (socket && socket.channelName && socket.allowSend)
    {
        const payload = { topic: inTopic.get(), clientId: socket.clientId, payload: inData.get() };
        socket.transmitPublish(socket.channelName + "/numbers", payload);
    }
};

inTrigger.onTriggered = send;