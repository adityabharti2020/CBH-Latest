// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const FloorCreationTable = () => {
//   const [tableData, setTableData] = useState([]);
//   const [editingRowId, setEditingRowId] = useState(null);

//   const addRow = () => {
//     const newRow = {
//       id: tableData.length + 1,
//       name: `Name ${tableData.length + 1}`,
//       age: Math.floor(Math.random() * 30) + 18,
//       // console.log("rowww====>", tableData.row.id);
//     };
//     setTableData([...tableData, newRow]);
//   };
//   const deleteRow = (id) => {
//     const updatedData = tableData.filter((row) => row.id !== id);
//     setTableData(updatedData);
//   };

//   const editRow = (id) => {
//     setEditingRowId(id);
//     // saveRow(id, { name: e.target.value });
//   };

//   const saveRow = (id, updatedData) => {
//     const updatedTableData = tableData.map((row) =>
//       row.id === id ? { ...row, ...updatedData } : row
//     );
//     setTableData(updatedTableData);
//     // setEditingRowId(null);
//   };
//   const updateRow = (id) => {
//     const temp = tableData.map((row, index) => (row?.id === id ? "" : ""));
//   };

//   // const getFloorData = async () => {
//   //   console.log("rowww====>", tableData.row.id);
//   //   try {
//   //     const res = await axios.post(
//   //       `/api/v1/admin/reset/password${tableData.id}`
//   //     );
//   //   } catch (error) {
//   //     console.log(error.message);
//   //   }
//   // };
//   // useEffect(() => {
//   //   getFloorData();
//   // }, []);

//   return (
//     <Box>
//       <Button onClick={addRow}>Add Row</Button>
//       <Table style={{ marginTop: "10px" }}>
//         <TableHead>
//           <TableCell style={{ backgroundColor: "#9f2936", color: "white" }}>
//             ID
//           </TableCell>
//           <TableCell style={{ backgroundColor: "#9f2936", color: "white" }}>
//             Name
//           </TableCell>
//           <TableCell style={{ backgroundColor: "#9f2936", color: "white" }}>
//             Age
//           </TableCell>
//           <TableCell style={{ backgroundColor: "#9f2936", color: "white" }}>
//             Action
//           </TableCell>
//         </TableHead>
//         <TableBody>
//           {tableData.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.id}</TableCell>
//               <TableCell>
//                 {editingRowId === row.id ? (
//                   <input
//                     type="text"
//                     value={row.name}
//                     // onSubmit={(e) => saveRow(row.id, { name: e.target.value })}
//                     onChange={(e) => saveRow(row.id, { name: e.target.value })}
//                   />
//                 ) : (
//                   row.name
//                 )}
//               </TableCell>
//               <TableCell>{row.age}</TableCell>
//               <TableCell>
//                 {editingRowId === row.id ? (
//                   <Button onClick={() => setEditingRowId(null)}>Save</Button>
//                 ) : (
//                   <>
//                     <Button onClick={() => editRow(row.id)}>Edit</Button>
//                     <Button onClick={() => deleteRow(row.id)}>Delete</Button>
//                   </>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//     <Box>
//         <Grid >
//             <TextField
//               name="name"
//               label="Enter Floor No"
//               //   onChange={(e) => setData({ ...data, email: e.target.value })}
//             />
//           </Grid>
//     </Box>
//   );
// };

// export default FloorCreationTable;
