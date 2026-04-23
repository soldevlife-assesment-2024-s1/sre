import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 20,
  // A string specifying the total duration of the test run.
  duration: '60s',

  // The following section contains configuration options for execution of this
  // test script in Grafana Cloud.
  //
  // See https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/
  // to learn about authoring and running k6 test scripts in Grafana k6 Cloud.
  //
  // cloud: {
  //   // The ID of the project to which the test is assigned in the k6 Cloud UI.
  //   // By default tests are executed in default project.
  //   projectID: "",
  //   // The name of the test in the k6 Cloud UI.
  //   // Test runs with the same name will be grouped.
  //   name: "script.js"
  // },

  // Uncomment this section to enable the use of Browser API in your tests.
  //
  // See https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/ to learn more
  // about using Browser API in your test scripts.
  //
  // scenarios: {
  //   // The scenario name appears in the result summary, tags, and so on.
  //   // You can give the scenario any name, as long as each name in the script is unique.
  //   ui: {
  //     // Executor is a mandatory parameter for browser-based tests.
  //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
  //     //
  //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
  //     executor: 'shared-iterations',
  //     options: {
  //       browser: {
  //         // This is a mandatory parameter that instructs k6 to launch and
  //         // connect to a chromium-based browser, and use it to run UI-based
  //         // tests.
  //         type: 'chromium',
  //       },
  //     },
  //   },
  // }
};

// curl --location 'a56f5ea98d13c460381fcb5e5651e569-68221043.ap-southeast-1.elb.amazonaws.com/booking/api/v1/book' \
// --header 'Content-Type: application/json' \
// --header 'Accept: application/json' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphaW5AZ2FtYWlsbC5jb20iLCJleHAiOjE3MTc0MDY4NzgsImlkIjo4fQ.0w0rjxKrAfmJnfptKV1QwzVkm-WX5BzQVurbRqB6YVk' \
// --data '{
//   "ticket_detail_id": 4,
//   "full_name": "Alex Smith",
//   "personal_id": "S1234567",
//   "user_id": 8,
//   "total_tickets": 1
// }
// '

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function () {
  let payload = JSON.stringify({
    ticket_detail_id: 3,
    full_name: 'Alex Smith',
    personal_id: 'S1234567',
    user_id: 1,
    total_tickets: 1,
  });

  let params = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphaW5AZ2FtYWlsLmNvbSIsImV4cCI6MTcxODA4MDAwNywiaWQiOjF9.B9jfAtYD7zq2i5WFFjo7kvI4nsRdWriNvsqBkf_RJFY',
    },
  };
  let resp = http.post(
    'http://ab9f9f4f5d5b2426399851ee7e29c7e2-838532969.ap-southeast-1.elb.amazonaws.com/booking/api/v1/book',
    payload,
    params
  );
  console.log('Response time was ' + String(resp.timings.duration) + ' ms');
  console.log('Response status was ' + String(resp.status));
  console.log('Response body was ' + String(resp.body));
  sleep(1);
}
