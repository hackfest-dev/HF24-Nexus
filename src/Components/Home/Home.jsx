import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Grid } from '@mui/material'; // Assuming you're using Material-UI for styling

const HomePage = () => {
    return (
        <div className="bg-gradient-to-b from-black-900 to-green-900 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <Typography variant="h3" component="h1" className="text-white text-center mb-8">
                    Welcome to Our Crypto Trading Platform
                </Typography>
                <p className="text-white text-center mb-8 mx-auto max-w-lg">Our platform is designed with your mental health and risk management in mind. Whether you're a seasoned trader or just starting out, we've got you covered.</p>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white rounded-lg p-4 hover:shadow-lg transition duration-300">
                                <CardContent>
                                    <Typography variant="h5" component="h2">Emotional Monitoring</Typography>
                                    <Typography variant="body2" color="textSecondary">Track your mood levels and assess stress with trade metrics.</Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white rounded-lg p-4 hover:shadow-lg transition duration-300">
                                <CardContent>
                                    <Typography variant="h5" component="h2">Intervention and Safeguards</Typography>
                                    <Typography variant="body2" color="textSecondary">Get suggestions for breaks and lock-outs for stress, and address gambling addictions.</Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white rounded-lg p-4 hover:shadow-lg transition duration-300">
                                <CardContent>
                                    <Typography variant="h5" component="h2">Educational Support</Typography>
                                    <Typography variant="body2" color="textSecondary">Analyze your trades and receive personalized and actionable insights.</Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                    {/* Add more grid items */}
                </Grid>

                <div className="mt-16 flex justify-center items-center">
                    <div className="w-full md:w-2/3 lg:w-1/2 bg-grey-700 bg-opacity-75 rounded-lg p-8">
                        <Typography variant="h4" className="text-white text-center mb-4 text-black">Top 5 Cryptocurrencies</Typography>
                        {/* Add content for top 5 cryptocurrencies */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="border border-gray-300 p-4 rounded-md">
                                <Typography variant="h5" className="mb-2">Bitcoin (BTC)</Typography>
                                <Typography variant="subtitle1" className="mb-2">Price: $60,000</Typography>
                                <Typography variant="subtitle1">Volume: $20 billion</Typography>
                            </div>
                            <div className="border border-gray-300 p-4 rounded-md">
                                <Typography variant="h5" className="mb-2">Bitcoin (BTC)</Typography>
                                <Typography variant="subtitle1" className="mb-2">Price: $60,000</Typography>
                                <Typography variant="subtitle1">Volume: $20 billion</Typography>
                            </div>
                            <div className="border border-gray-300 p-4 rounded-md">
                                <Typography variant="h5" className="mb-2">Bitcoin (BTC)</Typography>
                                <Typography variant="subtitle1" className="mb-2">Price: $60,000</Typography>
                                <Typography variant="subtitle1">Volume: $20 billion</Typography>
                            </div>
                            <div className="border border-gray-300 p-4 rounded-md">
                                <Typography variant="h5" className="mb-2">Bitcoin (BTC)</Typography>
                                <Typography variant="subtitle1" className="mb-2">Price: $60,000</Typography>
                                <Typography variant="subtitle1">Volume: $20 billion</Typography>
                            </div>
                            <div className="border border-gray-300 p-4 rounded-md">
                                <Typography variant="h5" className="mb-2">Bitcoin (BTC)</Typography>
                                <Typography variant="subtitle1" className="mb-2">Price: $60,000</Typography>
                                <Typography variant="subtitle1">Volume: $20 billion</Typography>
                            </div>
                            {/* Repeat for other cryptocurrencies */}
                        </div>
                    </div>
                </div>
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-4 text-white">About Our Website</h2>
                    <p className="mb-2 text-white">Our crypto trading platform provides a user-friendly interface for traders of all levels.</p>
                    <p className="mb-2 text-white">With advanced features like emotional monitoring and risk management, we prioritize the well-being of our users.</p>
                    <p className="mb-2 text-white">Join our community today and take control of your financial future!</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
