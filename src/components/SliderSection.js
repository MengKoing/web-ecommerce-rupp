import React from 'react'
import { Link } from 'react-router-dom'

export const SliderSection = () => {
  return (
    <div>
         {/* Slider section */}
      <section className="slider_section">
        <div id="customCarousel1" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-md-7 col-lg-6">
                      <div className="detail-box">
                        <h1>Fast Food Restaurant</h1>
                        <p>
                          Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia
                          laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt
                          repellat dolore, iste magni quos nihil ducimus libero ipsam.
                        </p>
                        <div className="btn-box">
                          <Link to="/menu" className="btn1">
                            Order Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container">
            <ol className="carousel-indicators">
              {Array.from({ length: 3 }).map((_, index) => (
                <li
                  key={index}
                  data-target="#customCarousel1"
                  data-slide-to={index}
                  className={index === 0 ? "active" : ""}
                ></li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}
