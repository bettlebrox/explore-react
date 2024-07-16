import { useChatCompletion } from "openai-streaming-hooks";
import { useEffect, useState } from "react";
import { Article } from "../interfaces/Article";
import { Box, Card, CardHeader, Container, IconButton, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconChatTypeMap } from "../utils/map";
import { ChatMessageParams } from "openai-streaming-hooks/dist/types";
import { faRobot, faUpLong } from "@fortawesome/free-solid-svg-icons";
export function Chatbot({ context }: { context: Article[] }) {
  const [promptText, setPromptText] = useState("");
  const { messages, submitPrompt } = useChatCompletion({
    model: "gpt-3.5-turbo", // Required
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    temperature: 0.9,
  });
  const onSend = () => {
    const prompt: ChatMessageParams[] = [];
    if (messages.length === 0) {
      prompt.push({
        role: "system",
        content:
          "You are an expert research assistant. answer questions based on the following articles. if the answer can't be found answer 'not found' --- " +
          context
            .slice(0, 10)
            .map((a) => a.text)
            .join("---"),
      });
    }
    prompt.push({
      role: "user",
      content: promptText,
    });
    submitPrompt(prompt);
    setPromptText("");
  };

  // When content is added to the chat window, make sure we scroll to the bottom so the most
  // recent content is visible to the user.
  useEffect(() => {
    if (messages.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [messages]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%", margin: "auto" }}>
        {messages.length < 1 ? (
          <Card title="No Messages"></Card>
        ) : (
          messages.slice(1).map((msg, i) => (
            <Card
              key={i}
              sx={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row" : "row-reverse",
                textAlign: "left",
              }}
            >
              <CardHeader
                subheader={
                  <>
                    <IconButton size="small">
                      <FontAwesomeIcon icon={msg.role ? iconChatTypeMap[msg.role] : faRobot} />
                    </IconButton>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{msg.content}</pre>
                  </>
                }
                sx={{ maxWidth: 650 }}
              ></CardHeader>
            </Card>
            /*<div className="message-wrapper" key={i}>
              <div className="role">Role: {msg.role}</div>
              <pre className="chat-message">{msg.content}</pre>
              {!msg.meta.loading && (
                <div className="tag-wrapper">
                  <span className="tag">
                    Timestamp: {formatDate(new Date(msg.timestamp))}
                  </span>
                  {msg.role === "assistant" && (
                    <>
                      <span className="tag">
                        Tokens: {msg.meta.chunks.length}
                      </span>
                      <span className="tag">
                        Response time: {msg.meta.responseTime}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>*/
          ))
        )}
      </Box>
      <Container sx={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
        <TextField
          placeholder="Write a prompt"
          value={promptText}
          onChange={(event) => {
            setPromptText(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSend();
            }
          }}
          disabled={messages.length > 0 && messages[messages.length - 1].meta.loading}
          multiline={true}
          rows={4}
        />
        <IconButton onClick={onSend}>
          <FontAwesomeIcon icon={faUpLong} />
        </IconButton>
      </Container>
    </>
  );
}
