import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bed, Users, DollarSign, Check, Calendar, Info, Shield, Coffee, CheckCircle } from 'lucide-react';
import { bookingService } from '../../../services/bookingService';
import BookRoomPopup from './BookRoomPopup';


const HotelDetailsPopup = ({ hotel, onClose }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [activeTab, setActiveTab] = useState('rooms');
    const [showBookingPopup, setShowBookingPopup] = useState(false);
    const [bookingConfirmation, setBookingConfirmation] = useState(null);
  
    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const roomsData = await bookingService.getHotelRoomsByBusinessId(hotel._id);
          setRooms(roomsData);
        } catch (error) {
          console.error('Error fetching rooms:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRooms();
    }, [hotel._id]);
  
  const handleRoomSelect = (room) => {
    setSelectedRoom(room._id === selectedRoom?._id ? null : room);
  };

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setShowBookingPopup(true);
  };

  
  const handleBookingSubmit = async (bookingData) => {
    try {
      const booking = await bookingService.createRoomBooking(bookingData);
      setShowBookingPopup(false);
      
      // Set booking confirmation details
      setBookingConfirmation({
        roomName: selectedRoom.name,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        email: bookingData.contactInformation.email
      });
    } catch (error) {
      console.error('Error booking room:', error);
      // Optionally handle error display
    }
  };

  const BookingConfirmationModal = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center relative"
        >
          <button 
            onClick={() => {
              setBookingConfirmation(null);
              onClose(); // Optionally close the entire hotel details popup
            }} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Room Booked Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Your reservation for {bookingConfirmation.roomName} is confirmed.
            <br />
            Check-in: {new Date(bookingConfirmation.checkIn).toLocaleDateString()}
            <br />
            Check-out: {new Date(bookingConfirmation.checkOut).toLocaleDateString()}
            <br />
            Confirmation details sent to {bookingConfirmation.email}
          </p>
          <button
            onClick={() => {
              setBookingConfirmation(null);
              onClose(); // Optionally close the entire hotel details popup
            }}
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    );
  };


  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 500 } },
    exit: { y: 50, opacity: 0 }
  };

  const tabContent = {
    rooms: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <motion.div
            key={room._id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            layout
            className={`border rounded-lg overflow-hidden shadow-sm transition-all cursor-pointer
              ${selectedRoom?._id === room._id ? 'ring-2 ring-emerald-500 shadow-lg' : 'hover:shadow-md'}`}
            onClick={() => handleRoomSelect(room)}
          >
            <div className="relative">
              <img
                src={room.images[0] || '/placeholder-room.jpg'}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              {selectedRoom?._id === room._id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-2 right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  Selected
                </motion.div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{room.description}</p>
              <div className="flex flex-wrap gap-3 mb-3">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Bed size={16} />
                  <span>{room.bedType}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users size={16} />
                  <span>{room.capacity.adults + room.capacity.children} guests</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  <DollarSign size={16} />
                  <span>${room.price}/night</span>
                </div>
              </div>
              {room.amenities && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    ),
    amenities: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotel.amenities?.map((amenity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
          >
            <Coffee className="w-5 h-5 text-emerald-500" />
            <span>{amenity}</span>
          </motion.div>
        ))}
      </div>
    ),
    policies: (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 p-6 rounded-lg"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            Check-in/Check-out
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Check-in time</p>
              <p className="font-medium">2:00 PM - 11:00 PM</p>
            </div>
            <div>
              <p className="text-gray-600">Check-out time</p>
              <p className="font-medium">Until 11:00 AM</p>
            </div>
          </div>
        </motion.div>
        
        {hotel.policies && Object.entries(hotel.policies).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              {key.charAt(0).toUpperCase() + key.slice(1)} Policy
            </h3>
            <p className="text-sm text-gray-600">{value || 'No specific policy'}</p>
          </motion.div>
        ))}
      </div>
    )
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          variants={contentVariants}
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white z-10 border-b">
            <div className="flex justify-between items-center p-6">
              <h2 className="text-2xl font-bold text-gray-800">{hotel.businessName}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex border-t">
              {['rooms', 'amenities', 'policies'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors
                    ${activeTab === tab 
                      ? 'text-emerald-600 border-b-2 border-emerald-600' 
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <p className="text-gray-500">Loading rooms...</p>
              </div>
            ) : rooms.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No rooms available for this hotel.</p>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t p-6 flex justify-between items-center">
            {selectedRoom && (
              <div className="text-sm">
                <p className="text-gray-600">Selected Room:</p>
                <p className="font-semibold">{selectedRoom.name} - ${selectedRoom.price}/night</p>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBookRoom(selectedRoom)}
              disabled={!selectedRoom}
              className={`px-6 py-2 rounded-lg transition-colors ${
                selectedRoom
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedRoom ? 'Book Room' : 'Select a Room'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {showBookingPopup && (
        <BookRoomPopup
          room={selectedRoom}
          onClose={() => setShowBookingPopup(false)}
          onBack={() => setShowBookingPopup(false)}
          onBookRoom={handleBookingSubmit}
        />
      )}
      {bookingConfirmation && <BookingConfirmationModal />}
    </AnimatePresence>
  );
};

export default HotelDetailsPopup;
