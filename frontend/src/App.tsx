import Header from './components/Header'
import Footer from './components/Footer'
import HouseInput from './components/HouseInput'

import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="app-content">
        <section className="hero-section">
          <span className="hero-label">
            MACHINE LEARNING PROJECT
          </span>

          <h1>
            California House Price Prediction
          </h1>

          <p>
            Explore machine learning-based house price
            estimation using California housing data.
          </p>
        </section>

        <HouseInput />

        <section className="information-section">
          <h2>About This Project</h2>

          <p>
            This application uses a trained Random Forest
            regression model to estimate house values
            based on eight features from the California
            Housing dataset.
          </p>

          <p>
            The prediction is an estimate for educational
            and demonstration purposes. It should not be
            treated as an official property valuation.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App