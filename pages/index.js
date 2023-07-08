import React, { useState, useEffect } from 'react';

// import { Oval } from 'react-loader-spinner';

const fitness = `
Act as a fitness expert.
I will give you my person details in the next message.
Make a complete diet plan according to my needs.
Wait for my next message and then return the diet plan.
`;

export default function GeneratePosts() {


  const [content, setContent] = useState("Your diet plan will come here.");
  const [loading, setLoading] = useState(false);

  async function callGPT(prompt, newContent) {
    console.log("calling chat gpt");

    // https://api.openai.com/v1/chat/completions
    setLoading(true);
    try {
      const response = await fetch(process.env.chatGpt, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            "role": "user",
            "content": prompt
          }, {
            "role": "user",
            "content": newContent
          }]

        })
      });

      const data = await response.json();
      const maal = data.choices[0].message.content;

      setLoading(false);
      setContent(maal);

    } catch (error) {
      console.error(error.message);
      setLoading(false);
      setContent("ERROR while generating, check something.");
    }
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <>
      <div className="flex">

        <main className="w-full p-5">
          <div className="flex flex-wrap ring-1 ring-gray-200 rounded-3xl">
            <div className="p-5">

              <label htmlFor="message" className="text-xl block mb-3 text-sm font-medium text-gray-900 dark:text-white">Enter your personal details 👇</label>

            </div>

            <div className="p-5 lg:w-1/2 w-full  max-w-full">
              <label htmlFor="message" className="block mt-5 text-xl font-medium text-gray-900 dark:text-white">Your diet plan here 👇</label>
              <div className="pt-3">
                {
                  !loading &&
                  <textarea
                    value={content}
                    onChange={handleContentChange}
                    id="message" rows="30"
                    className="border border-gray-200 rounded-lg w-full p-2.5 text-sm text-gray-900 "
                    placeholder="Write your thoughts here...">
                  </textarea>
                }
              </div>
            </div>

          </div>

        </main>
      </div>
    </>);
}


// function Spinner() {
//     return <Oval
//         height={40}
//         width={40}
//         color="#4fa94d"
//         wrapperStyle={{}}
//         wrapperclassName=""
//         visible={true}
//         ariaLabel='oval-loading'
//         secondaryColor="#4fa94d"
//         strokeWidth={2}
//         strokeWidthSecondary={2}
//     />;
// }

// getstaticprops

// getserversideprops

// /api folder