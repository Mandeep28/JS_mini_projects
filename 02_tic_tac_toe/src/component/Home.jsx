import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="main">
    <p className="small">Timeless Fun That Never Fades Away!</p>
   <h1 className="heading">Start Game</h1>
    <div className="btn-container">
        <Link to="/easygame" className="play" id="easy">Easy</Link>
        <Link to="/hardgame" className="play" id="hard">Hard</Link>
    </div>
   
</section>
  )
}

export default Home
