# Simple Notification Service

## Setup

1- Start the services.

```shell
docker-compose up
```

2- Run the seeds.

```shell
docker-compose exec node_app npm run seed
```

## Design

![Design diagram](/readme_assets/diagram.png)

1. The service consumes messages from **rabbitmq** *(this is the only way to communicate with the service)*, these messages are the ids of the notifications to be processed.

   rabbitmq message example:

   ```json
   { "id": "60bb538e0d71530037eece44" }
   ```

2. On each message it fetches the notification from the database and processes it depending on the notification type.

   notification schema:

   ```javascript
   {
       title: { type: String, required: true },
       body: { type: String, required: true },
       type: { type: String, enum: ['single', 'topic'], required: true },
       providers: { type: Array, required: true }, //e.g fcm, apn,sms, email ..etc.
       consumers: { type: Array, required: true } // Array of user ids or topics.
     }
   ```

   Single notifications are intended for a single user or a small goup of users while topic notifications are intended for a large number of users.

3. NotificationService defined in **notification_service.js** decides the appropiate service **SingleMessageService/TopicMessageService** to handle the notification based on its type, these services then call the providers to send the notification to the consumers.

4. This service has no public APIs, the only of way of communication with the it is by sending messages through **rabbitmq**.

## Scenario

The database is exposed on port _27018_ and rabbitmq management portal is exposed on port _15673_.

1. Connect to the database from any mongo client and copy the id of one of the seeded notifications.

2. Other services are supposed to publish to the queue, we can simulate this by publishing from the management portal.
Open the rabbitmq management portal and publish a message to the queue containg the notification id as explained above.

3. The service logs the following depending on the notification type:

```
Sent Notification #1 via SMS to +111111111111
Sent Notification #1 via FCM to token
Sent Notification #1 via Email to email@example.com
```

```
Sent Notification #2 via FCM to topic: topic_1
Sent Notification #2 via SMS to topic: topic_1
Sent Notification #2 via Email to topic: topic_1
```

## Future Improvments

Depending on the scale and the load on the service we may need to add a cache in front of the database to decrease the hits on it.