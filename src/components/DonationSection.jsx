import React from 'react';

const DonationSection = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div
                        className="card shadow-sm"
                        style={{
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #f9f9f9, #e9ecef)',
                        }}
                    >
                        <div className="card-body">
                            <h5
                                className="card-title text-center"
                                style={{
                                    color: '#343a40',
                                    fontWeight: 'bold',
                                    fontSize: '1.5rem',
                                }}
                            >
                                Apoya este Proyecto ❤️
                            </h5>
                            <p
                                className="card-text text-center"
                                style={{ fontSize: '1rem', color: '#6c757d' }}
                            >
                                Este proyecto es mantenido por <b>Gabriel Garcia Caysahuana</b>.
                                Tu donación ayuda a mejorar esta herramienta y mantenerla gratuita para todos los usuarios.
                            </p>
                            <p
                                className="text-center"
                                style={{ fontSize: '1rem', color: '#6c757d' }}
                            >
                                Si encuentras útil esta herramienta, considera realizar una donación
                                para ayudarnos a cubrir los costos de desarrollo y mantenimiento.
                            </p>
                            <div style={{ textAlign: 'center' }}>
                                <form
                                    action="https://www.paypal.com/donate"
                                    method="post"
                                    target="_blank"
                                >
                                    <input
                                        type="hidden"
                                        name="hosted_button_id"
                                        value="9LU6XZNK9DTPJ"
                                    />
                                    <input
                                        type="image"
                                        src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
                                        border="0"
                                        name="submit"
                                        alt="Donate with PayPal"
                                        style={{
                                            marginTop: '15px',
                                            borderRadius: '5px',
                                        }}
                                    />
                                    <img
                                        alt=""
                                        border="0"
                                        src="https://www.paypal.com/en_US/i/scr/pixel.gif"
                                        width="1"
                                        height="1"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationSection;
