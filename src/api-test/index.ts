export const Sensors = [
    {
        sensorDescription: "It is a test Sensor 1 in DB",
        sensorId: 1,
        sensorName: "Temperature Sensor"
    },
    {
        sensorDescription: "It is a test Sensor 2 in DB",
        sensorId: 2,
        sensorName: "Humidity Sensor"
    }
]
export const StationByThingId = [
    {
        description: "It is a test Station 1 in DB",
        historicalStations: [
            {
                id: {
                    stationId: 1,
                    thingId: 1
                },
                installationDate: "2023-10-01",
                isActive: true,
                station: {
                    description: "It is a test Station 1 in DB",
                    id: 1,
                    name: "Test Station 1",
                    node: "Test node"
                },
                thing: {
                    geoParameters: {
                        pondBottomType: "sandy soil",
                        depth: "2m",
                        shape: "circle",
                        coordinates: "xyz",
                        radius: "3m"
                    },
                    id: 1,
                    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vsage.vn%2Ftin-tuc-su-kien%2Fcanh-tac-bao-ton%2F&psig=AOvVaw1UR3BZY33hbX-lyeRr1XLX&ust=1726490896141000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKi4hvv9xIgDFQAAAAAdAAAAABAE",
                    thingName: "Test Thing"
                }
            }
        ],
        id: 1,
        multiDataStreamDTOs: [
            {
                multiDataStreamDescription: "It is a test MultiDataStream 1 in DB",
                multiDataStreamId: 1,
                multiDataStreamName: "Test MultiDataStream 1",
                sensor: {
                    sensorDescription: "It is a test Sensor 1 in DB",
                    sensorId: 1,
                    sensorName: "Temperature Sensor"
                }
            },
            {
                multiDataStreamDescription: "It is a test MultiDataStream 2 in DB",
                multiDataStreamId: 2,
                multiDataStreamName: "Test MultiDataStream 2",
                sensor: {
                    sensorDescription: "It is a test Sensor 2 in DB",
                    sensorId: 2,
                    sensorName: "Humidity Sensor"
                }
            }
        ],
        name: "Test Station 1",
        node: "Test node",
        taskingCapabilities: [
            {
                actuator: {
                    description: "It is a feed valve for eel tank",
                    documentation: {
                        metadata: "https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf",
                        encodingType: "application/pdf"
                    },
                    id: 1,
                    name: "Feed valve"
                },
                autoConfig: {
                    middle: "50cm",
                    min: "0cm",
                    max: "100cm"
                },
                automation: 0,
                configuration: {
                    status: "on"
                },
                description: "It is the behaviour to turn on or off valve",
                id: 1,
                name: "Actuator activation for feed valve",
                station: {
                    description: "It is a test Station 1 in DB",
                    id: 1,
                    name: "Test Station 1",
                    node: "Test node"
                }
            },
            {
                actuator: {
                    description: "It is a emptying valve for eel tank",
                    documentation: {
                        metadata: "https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf",
                        encodingType: "application/pdf"
                    },
                    id: 2,
                    name: "Emptying valve"
                },
                autoConfig: {
                    middle: "50cm",
                    min: "0cm",
                    max: "100cm"
                },
                automation: 0,
                configuration: {
                    status: "off"
                },
                description: "It is the behaviour to turn on or off valve",
                id: 2,
                name: "Actuator activation for emptying valve",
                station: {
                    description: "It is a test Station 1 in DB",
                    id: 1,
                    name: "Test Station 1",
                    node: "Test node"
                }
            }
        ]
    },
    {
        description: "It is a test 2 Station in CTU New",
        historicalStations: [
            {
                id: {
                    stationId: 2,
                    thingId: 1
                },
                installationDate: "2024-09-21",
                isActive: true,
                station: {
                    description: "It is a test 2 Station in CTU New",
                    id: 2,
                    name: "Test Station 2 for Lemon Tree New",
                    node: "Test node"
                },
                thing: {
                    geoParameters: {
                        pondBottomType: "sandy soil",
                        depth: "2m",
                        shape: "circle",
                        coordinates: "xyz",
                        radius: "3m"
                    },
                    id: 1,
                    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vsage.vn%2Ftin-tuc-su-kien%2Fcanh-tac-bao-ton%2F&psig=AOvVaw1UR3BZY33hbX-lyeRr1XLX&ust=1726490896141000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKi4hvv9xIgDFQAAAAAdAAAAABAE",
                    thingName: "Test Thing"
                }
            }
        ],
        id: 2,
        multiDataStreamDTOs: [],
        name: "Test Station 2 for Lemon Tree New",
        node: "Test node",
        taskingCapabilities: []
    }
]

export const ThingById = {
    geoParameters: {
        pondBottomType: "sandy soil",
        depth: "2m",
        shape: "circle",
        coordinates: "xyz",
        radius: "3m"
    },
    historicalStations: [
        {
            installationDate: "2023-10-01",
            isActive: true,
            stationId: 1,
            stationName: "Test Station 1",
            thingId: 1
        },
        {
            installationDate: "2024-09-21",
            isActive: true,
            stationId: 2,
            stationName: "Test Station 2 for Lemon Tree New",
            thingId: 1
        }
    ],
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vsage.vn%2Ftin-tuc-su-kien%2Fcanh-tac-bao-ton%2F&psig=AOvVaw1UR3BZY33hbX-lyeRr1XLX&ust=1726490896141000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKi4hvv9xIgDFQAAAAAdAAAAABAE",
    nameThing: "Test Thing",
    thingId: 1
}

export const DataObservationsByDataStreamId = [
    {
        dataStreamId: "1",
        id: "66eee595c34396184abc766d",
        result: " 533cm",
        resultTime: "2024-09-21T22:26:13.979Z[UTC]"

    },
    {
        dataStreamId: "1",
        id: "66eee595c34396184abc766d",
        result: " 513cm",
        resultTime: "2024-09-21T22:26:13.979Z[UTC]"

    },
    {
        dataStreamId: "1",
        id: "66eee595c34396184abc766d",
        result: " 523cm",
        resultTime: "2024-09-21T22:26:13.979Z[UTC]"

    },
    {
        dataStreamId: "2",
        id: "65ef3649aa3e3c6a7dbfe92d",
        result: "27.9",
        resultTime: "2024-02-08T23:52:00Z[UTC]"
    },
    {
        dataStreamId: "3",
        id: "65ef3649aa3e3c6a7dbfe92d",
        result: "4",
        resultTime: "2024-02-08T23:52:00Z[UTC]"
    }
]