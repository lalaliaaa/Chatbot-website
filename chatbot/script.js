document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chat");
  const input = document.getElementById("input");
  const button = document.getElementById("button");

  let intents = [];
  let initialPromptSent = false;
  let isInitialPrompt = true; // Flag to track if initial prompt was sent

  // Load intents data
  fetch("intents.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      intents = data[0].intents; // Adjust based on actual structure
      console.log("Loaded intents:", intents); // Log intents to verify they are loaded

      // Send initial prompt when the page loads
      sendMessage(
        "bot",
        "Ketik nomor untuk memilih [1-3]: 1. Anda seorang yang memiliki kesehatan fisik yang baik dan dapat melakukan berbagai aktivitas dengan mudah dan tidak mengalami kesulitan untuk bergerak., (2) Anda seorang yang memiliki kesehatan fisik yang terbatas namun masih dapat melakukan beberapa aktivitas dengan sendirinya. (3) Anda seorang yang memiliki kesehatan fisik yang sangat terbatas dan memerlukan bantuan fasilitas memadai dalam berwisata."
      );
      initialPromptSent = true;
    })
    .catch((error) => console.error("Error loading intents:", error));

  // Function to get a response based on user input
  function getResponse(userInput) {
    console.log("User Input for Response:", userInput); // Log user input for debugging
    for (let intent of intents) {
      console.log("Checking intent:", intent.tag); // Log current intent for debugging
      for (let pattern of intent.patterns) {
        console.log("Checking pattern:", pattern); // Log current pattern for debugging
        const regex = new RegExp(pattern, "i"); // Case-insensitive regex
        if (regex.test(userInput)) {
          console.log("Matched Intent:", intent.tag); // Log matched intent tag
          return intent.responses[
            Math.floor(Math.random() * intent.responses.length)
          ];
        }
      }
    }
    return "I'm sorry, I didn't understand that.";
  }

  // Function to send a message to the chat
  function sendMessage(sender, message) {
    chat.innerHTML += `<div class="message ${sender}"><div class="text">${message}</div></div>`;
    chat.scrollTop = chat.scrollHeight;
  }

  // Handle user input
  button.addEventListener("click", () => {
    const userInput = input.value.trim().toLowerCase(); // Trim leading and trailing spaces
    if (!userInput) return;

    // Send user message
    sendMessage("user", input.value);
    input.value = "";

    if (userInput === "0") {
      // Handle case when user input is "0"
      sendMessage("bot", getResponseFromTag("greeting"));
      isInitialPrompt = false; // Allow normal intent handling after greeting
    } else if (isInitialPrompt) {
      // Provide response based on user input for options 1-3 or other intents
      const responses = {
        1: "Berikut beberapa rekomendasi tempat wisata untuk Anda: Monumen Nasional, Dunia Fantasi, Taman Mini Indonesia Indah, Atlantis Water Adventure, Taman Impian Jaya Ancol, Kebun Binatang Ragunan, Ocean Ecopark, Pelabuhan Marina, Pulau Bidadari, Pulau Pari, Pulau Pelangi, Pasar Seni, Museum Fatahillah, Museum Bank Indonesia, Kidzania, Masjid Istiqlal, Gereja Katedral, Pasar Tanah Abang, Pecinan Glodok, Sea World, Wisata Agro Edukatif Istana Susu Cibugary, Wisata Kuliner Pecenongan, Taman Menteng, Setu Babakan, Taman Suropati, Grand Indonesia Mall, Museum Macan, Galeri Nasional Indonesia, Museum Seni Rupa dan Keramik, Jakarta Aquarium dan Safari, Taman Situ Lembang, Taman Ismail Marzuki, Galeri Indonesia Kaya, Kampung Cina, Pantai Ancol, Taman Lapangan Banteng, Museum Sumpah Pemuda, Museum Tekstil, Tugu Proklamasi, Taman Legenda Keong Mas, Museum Kebangkitan Nasional, Museum Sasmita Loka Ahmad Yani, Museum Basoeki Abdullah, Museum Layang-Layang, Margasatwa Muara Angke, Freedom Library, Perpustakaan Nasional, Cibubur Garden Dairy (Cibugary), Museum Perangko, Museum Tengah Kebun, Taman Cattleya, Taman Hutan Tebet, Taman Spathodea, Plaza Indonesia",
        2: "Berikut beberapa rekomendasi tempat wisata untuk Anda: Monumen Nasional, Dunia Fantasi, Taman Mini Indonesia Indah, Atlantis Water Adventure, Taman Impian Jaya Ancol, Kebun Binatang Ragunan, Ocean Ecopark, Museum Fatahillah, Museum Bank Indonesia, Kidzania, Masjid Istiqlal, Gereja Katedral, Pasar Tanah Abang, Sea World, Grand Indonesia Mall, Museum Macan, Galeri Nasional Indonesia, Museum Seni Rupa dan Keramik, Jakarta Aquarium dan Safari, Taman Ismail Marzuki, Galeri Indonesia Kaya, Taman Lapangan Banteng, Taman Legenda Keong Mas, Museum Basoeki Abdullah, Museum Layang-Layang, Perpustakaan Nasional, Plaza Indonesia",
        3: "Berikut beberapa rekomendasi tempat wisata untuk Anda: Museum Nasional, Taman Mini Indonesia Indah, Atlantis Water Adventure, Taman Impian Jaya Ancol, Grand Indonesia Mall, Museum Macan, Taman Ismail Marzuki, Taman Lapangan Banteng, Museum Basoeki Abdullah, Perpustakaan Nasional, Plaza Indonesia",
      };

      // Provide response based on user input
      if (responses[userInput]) {
        sendMessage("bot", responses[userInput]);
      } else {
        sendMessage(
          "bot",
          "Maaf, saya tidak mengerti pilihan Anda. Silakan pilih nomor antara 1-3."
        );
      }
    } else {
      // Normal intent processing after greeting
      const botResponse = getResponse(userInput);
      sendMessage("bot", botResponse);
    }
  });

  // Handle Enter key press
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      button.click();
    }
  });

  // Function to get response from a specific intent tag
  function getResponseFromTag(tag) {
    for (let intent of intents) {
      if (intent.tag === tag) {
        return intent.responses[
          Math.floor(Math.random() * intent.responses.length)
        ];
      }
    }
    return "I'm sorry, I didn't understand that.";
  }
});
