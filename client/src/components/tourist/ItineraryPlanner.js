// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Calendar, Clock, MapPin, Plus } from 'lucide-react';

// export default function ItineraryPlanner() {
//   // Placeholder data - would come from backend
//   const itineraryItems = [
//     {
//       id: 1,
//       time: '09:00 AM',
//       activity: 'Hotel Checkout',
//       location: 'Sunset Beach Resort'
//     },
//     {
//       id: 2,
//       time: '10:30 AM',
//       activity: 'Guided Tour',
//       location: 'Ancient Temple Complex'
//     },
//     {
//       id: 3,
//       time: '02:00 PM',
//       activity: 'Lunch',
//       location: 'Local Market'
//     }
//   ];

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>Trip Itinerary</CardTitle>
//         <Button size="sm">
//           <Plus className="h-4 w-4 mr-2" />
//           Add Activity
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-6">
//           {itineraryItems.map(item => (
//             <div key={item.id} className="flex items-start gap-4">
//               <div className="flex-shrink-0 w-16 text-sm text-gray-600">{item.time}</div>
//               <div className="flex-1 p-4 border rounded-lg">
//                 <h4 className="font-medium">{item.activity}</h4>
//                 <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
//                   <MapPin className="h-4 w-4" />
//                   {item.location}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

