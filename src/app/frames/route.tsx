import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  // Function to fetch a random meme from the API
  const fetchRandomMeme = async () => {
    try {
      const response = await fetch("https://meme-api.com/gimme/wholesomememes");
      if (!response.ok) {
        throw new Error("Failed to fetch meme");
      }
      const data = await response.json();
      return data.url; // Assuming the API response contains the URL of the meme image
    } catch (error) {
      console.error("Error fetching meme:", error);
      return null;
    }
  };

  // Check if the "Get Meme" button is clicked
  if (ctx.pressedButton && ctx.searchParams.value === "Yes") {
    // Fetch a random meme
    const memeUrl = await fetchRandomMeme();

    // Return the frame with the fetched meme image
    return {
      image: memeUrl ? (
        <img src={memeUrl} alt="Meme" />
      ) : (
        "Failed to fetch meme"
      ),
      buttons: [
        // Buttons for sharing or tipping as before
        <Button key="share" action="post" target={{ query: { value: "No" } }}>
          Share
        </Button>,
        <Button key="tip" action="post" target={{ query: { value: "No" } }}>
          Tip Me
        </Button>,
      ],
    };
  } else {
    // Default frame with a message
    return {
      image:
        "https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      buttons: [
        <Button
          key="get-meme"
          action="post"
          target={{ query: { value: "Yes" } }}
        >
          Get Meme
        </Button>,
        <Button key="share" action="post" target={{ query: { value: "No" } }}>
          Share
        </Button>,
        <Button key="tip" action="post" target={{ query: { value: "No" } }}>
          Tip Me
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
