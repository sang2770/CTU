import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const useMqttSubscribe = () => {
    const routingKeyArr = ["actuator/controller-update", "actuator/automation-update"];

    const [message, setMessage] = useState(null);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const mqttClient = mqtt.connect('ws://dev.iotlab.net.vn:1884/mqtt', {
            keepalive: 60, // Thời gian giữ kết nối
            reconnectPeriod: 1000, // Thời gian kết nối lại
        });
        mqttClient.on('connect', () => {
            console.log(`Connected to MQTT broker and subscribed to ${routingKeyArr[0]},${routingKeyArr[1]}`);
            routingKeyArr.forEach((routingKey) => {
                mqttClient.subscribe(routingKey, () => {
                    console.log('subscribe to ', routingKey);
                })
            })
        });

        mqttClient.on('message', (receivedTopic, msg) => {
            console.log("Received '" + message + "' on '" + receivedTopic + "'");
            setMessage(JSON.parse(msg?.toString()));
            console.log("Message Recieved: ", JSON.parse(msg?.toString()));
        });

        mqttClient.on('close', () => {
            console.log('Connection closed');
        });

        mqttClient.on('error', (error) => {
            console.error('Connection error:', error);
        });

        mqttClient.on('reconnect', () => {
            console.log('Reconnecting...');
        });

        mqttClient.on('offline', () => {
            console.log('Client offline');
        });

        setClient(mqttClient);

        return () => {
            mqttClient.end();
        };
    }, []);

    const publishMessage = (msg) => {
        // setMessage(null)
        // client.publish(topic, msg, { qos: 0 }, (err) => {
        //     if (err) {
        //         console.error(`Publish error: ${err}`);
        //     } else {
        //         console.log(`Published: ${msg}`);
        //     }
        // });
    };

    return { message, publishMessage };
};

export default useMqttSubscribe;
