// import 'https://apis.google.com/js/api.js';
import { gapi } from 'gapi-script';

export function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
export function loadClient() {
    gapi.client.setApiKey("AIzaSyCQsOEShMhJHSsKxhr2xWJSjKinWfhePHc");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
export function execute({query,eventType,order,publishedAfter,publishedBefore,videoDefinition,videoDuration}) {

    if (publishedAfter === "None") {
        publishedAfter = new Date('1970-10-10');
    } else {
        publishedAfter = new Date(publishedAfter);
    }

    if (publishedBefore === "None") {
        publishedBefore = new Date();
    } else {
        publishedBefore = new Date(publishedBefore);
    }
    
    // console.log(publishedAfter);
    // console.log(publishedBefore);

    const isoAfter = publishedAfter.toISOString();
    const isoBefore = publishedBefore.toISOString();
    // console.log(isoAfter,isoBefore); // 2021-02-23T13:11:07.000Z

    // https://content-youtube.googleapis.com/youtube/v3/search?publishedAfter=2018-12-12T00%3A00%3A00.000Z&part=snippet&publishedBefore=2018-12-14T00%3A00%3A00.000Z&q=rajini&maxResults=5&order=title&key=AIzaSyCQsOEShMhJHSsKxhr2xWJSjKinWfhePHc&videoDefinition=any
    console.log(query+eventType+order+isoAfter+isoBefore+videoDefinition+videoDuration);
    console.log(eventType+videoDefinition+videoDuration);
    return gapi.client.youtube.search.list({
        "part": [
            "snippet"
        ],
        "q":query,
        "maxResults": 5,
        "order": order,
        // "publishedAfter": isoAfter,
        // "publishedBefore": isoBefore,
        // "videoDefinition":videoDefinition,
        // "eventType":eventType,
        // "videoDuration":videoDuration
    })
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            return response;
        },
            function (err) { 
                console.error("Execute error", err);
            });
}
gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: "512304881844-se2p7h4islirlsc60fubhafv7meeprc9.apps.googleusercontent.com" });
});