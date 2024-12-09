// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const WebhookDataDisplay = () => {
//   const [webhookData, setWebhookData] = useState([]);

//   // Initialize Socket.IO client
//   useEffect(() => {
//     const socket = io('https://webhook-api-rw66.onrender.com'); // Use your backend URL

//     // Listen for real-time updates
//     socket.on('update', (updatedData) => {
//       console.log('Real-time update received:', updatedData);
//       setWebhookData(updatedData); // Update state with new data
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Fetch initial data from backend
//   useEffect(() => {
//     axios.get('https://webhook-api-rw66.onrender.com/webhook-data')
//       .then((response) => {
//         setWebhookData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   // Handle the second webhook manually (fallback)
//   const handleSecondWebhook = (email) => {
//     axios.post('https://webhook-api-rw66.onrender.com/webhook/second', { '': email }) // Send data in the correct format
//       .then(() => {
//         console.log('Second webhook sent');
//       })
//       .catch((error) => {
//         console.error('Error updating status:', error);
//       });
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Phone</TableCell>
//             <TableCell>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {webhookData.map((row) => (
//             <TableRow key={row.email}>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.email}</TableCell>
//               <TableCell>{row.phone}</TableCell>
//               <TableCell>
//                 <Button
//                   variant="contained"
//                   color={row.secondConfirmationSent ? "success" : "error"}
//                   onClick={() => handleSecondWebhook(row.email)}
//                   disabled={row.secondConfirmationSent}
//                 >
//                   {row.secondConfirmationSent ? "Agreed" : "Pending"}
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default WebhookDataDisplay;



import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Button
} from '@mui/material';

// Replace with your backend URL
const socket = io('https://webhook-api-rw66.onrender.com');

function WebhookDataDisplay() {
    const [webhookData, setWebhookData] = useState([]);

    // Fetch the current webhook data from the backend when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://webhook-api-rw66.onrender.com/api/webhook-data');
                const data = await response.json();
                setWebhookData(data);  // Set the data received from the backend
                console.log('Initial data fetched:', data);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchData();

        // Listen for real-time updates from the backend
        socket.on('update', (data) => {
            console.log('Data received:', data);
            setWebhookData(data); // Update state with new data
        });

        // Cleanup on unmount
        return () => {
            socket.off('update');
        };
    }, []);

    return (
        <Box sx={{ padding: 4, fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom>
                User Consent
            </Typography>
            {webhookData.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                    <CircularProgress />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        Waiting for data...
                    </Typography>
                </Box>
            ) : (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Name
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Email
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Phone
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Agreed
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {webhookData.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{entry.name || '-'}</TableCell>
                                    <TableCell align="center">{entry.email || '-'}</TableCell>
                                    <TableCell align="center">{entry.phone || '-'}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: entry.secondConfirmationSent ? 'green' : 'red',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: entry.secondConfirmationSent ? 'darkgreen' : 'darkred',
                                                },
                                            }}
                                        >
                                            {entry.secondConfirmationSent ? 'Agreed' : 'Pending'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

export default WebhookDataDisplay;

















// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// // Replace with your backend URL
// const socket = io('https://webhook-api-rw66.onrender.com');

// function App() {
//     const [webhookData, setWebhookData] = useState([]);

//     useEffect(() => {
//         // Listen for real-time updates from the backend
//         socket.on('update', (data) => {
//             console.log('Data received:', data);
//             setWebhookData(data);
//         });

//         // Cleanup on unmount
//         return () => {
//             socket.off('update');
//         };
//     }, []);

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <h1>User Consent</h1>
//             {webhookData.length === 0 ? (
//                 <p>No data received yet.</p>
//             ) : (
//                 <table border="1" cellPadding="10" cellSpacing="0">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Agreed</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {webhookData.map((entry, index) => (
//                             <tr key={index}>
//                                 <td>{entry.name || '-'}</td>
//                                 <td>{entry.email || '-'}</td>
//                                 <td>{entry.phone || '-'}</td>
//                                 <td>{entry.secondConfirmationSent ? 'Yes' : 'No'}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default App;
