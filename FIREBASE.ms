Updating the news in firebase manually:
Update the firebase-database.json with the added articles and "import" in firebase.

Sending push notifications from the firebase console:
Make sure to set:
 - Message text: the message text
 - Message label: message title displayed in firebase
In the Advanced:
 - Title: the message title (this is important!)
 - In custom data add the fields:
    - inAppTitle: repeat the "Title"
    - inAppBody: repeat the "Message text"
    - url: link to the page to be opened on tap (best matched with the news article)
    - id: the id of the news 

