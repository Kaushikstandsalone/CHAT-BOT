import React, { useState, useRef, useEffect } from 'react'
import "../components/Chatbot.css"
import { useNavigate } from "react-router-dom";
import { getToken,logout } from "../auth";

const Chatbot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hello, I'm a ChatBot. How can I help?" }
  ])
  const bodyRef = useRef(null)
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate("/login"); // 🔒 block access
    }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMsg = { id: Date.now(), sender: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    try{
        const res = await fetch("http://localhost:5000/chat",{
            method:"POST",
            headers:{"Content-Type":"application/json",
                "Authorization": getToken(),
            },
            
            body:JSON.stringify({message:text})
        })
        const data = await res.json();
           if (!res.ok) {
      throw new Error(data.reply || "Backend error");
    }
        const botReply = {
            id : Date.now() +1,
            sender:"bot",
            text:data.reply
        }
      
         setMessages(prev => [...prev, botReply])
    }
    catch(error){
        setMessages(prev => [
      ...prev,
      { id: Date.now()+2, sender: "bot", text: "AI error. Try again." }
    ])
    }
   
  }

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  return (
    <div className='container'>
      <div className='box'>
        <div className='chat-header'>ChatBot</div>
        <div className='chat-body' ref={bodyRef}>
          {messages.map(m => (
            <div key={m.id} className={`message ${m.sender}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className='chat-footer'>
          <form className='chat-form' onSubmit={handleSubmit}>
            <input
              className='chat-input'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type a message...'
            />
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
      <button onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </button>
    </div>
  )
}

export default Chatbot
