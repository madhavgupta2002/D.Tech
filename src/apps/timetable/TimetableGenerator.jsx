import React, { useState, useRef, useEffect } from 'react';
import { Search, Printer } from 'lucide-react';
import codetoname from './data/codetoname';
import slottocode from './data/slottocode';
import regData from './data/regData.json';
import codetoslot from './data/codetoslot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const TimetableGenerator = () => {
    const [timetableData, setTimetableData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCell, setActiveCell] = useState(null);
    const [batchUpdateData, setBatchUpdateData] = useState({});
    const [rollNumber, setRollNumber] = useState('');
    const [studentSubjects, setStudentSubjects] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState({});
    const [newSubjectCode, setNewSubjectCode] = useState('');
    const [showSubjectNames, setShowSubjectNames] = useState(false);
    const timetableRef = useRef(null);

    // Define a color mapping for slots
    const slotColors = {
        E1: '#FFB3BA', E2: '#BAFFC9', E3: '#BAE1FF', E4: '#FFFFBA',
        E5: '#FFD9BA', E6: '#E1BAFF', E7: '#BAFFD9', E8: '#FFBAE1',
        E9: '#BAFFFF', E10: '#FFBAFF', Z: '#E6E6E6'
    };

    useEffect(() => {
        if (studentSubjects.length > 0) {
            const initialSelectedSlots = {};
            studentSubjects.forEach(subject => {
                initialSelectedSlots[subject] = '';
            });
            setSelectedSlots(initialSelectedSlots);
        }
    }, [studentSubjects]);

    const handleRollNumberSearch = () => {
        const subjects = regData[rollNumber.toUpperCase()] || [];
        setStudentSubjects(subjects);
        setTimetableData({});  // Clear the timetable
    };

    const handleSlotSelection = (subject, slot) => {
        setSelectedSlots(prev => ({
            ...prev,
            [subject]: slot
        }));
    };

    const fillTimetable = () => {
        const newTimetableData = {};
        Object.entries(selectedSlots).forEach(([subject, slot]) => {
            if (slot) {
                timetableSlots.forEach((row, dayIndex) => {
                    row.forEach((cellSlot, slotIndex) => {
                        if (cellSlot === slot) {
                            const key = `${dayIndex}-${slotIndex}`;
                            newTimetableData[key] = { code: subject, teacher: '', classroom: '', type: 'lecture' };
                        }
                    });
                });
            }
        });
        setTimetableData(newTimetableData);
    };

    const toggleSubject = (slot, code) => {
        setTimetableData(prev => {
            const newData = { ...prev };
            timetableSlots.forEach((row, dayIndex) => {
                row.forEach((cellSlot, slotIndex) => {
                    if (cellSlot === slot) {
                        const key = `${dayIndex}-${slotIndex}`;
                        if (newData[key] && newData[key].code === code) {
                            delete newData[key];
                        } else {
                            newData[key] = { code, teacher: '', classroom: '', type: 'lecture' };
                        }
                    }
                });
            });
            return newData;
        });
    };

    const handleCellClick = (dayIndex, slotIndex) => {
        const key = `${dayIndex}-${slotIndex}`;
        const cellData = timetableData[key];
        setActiveCell({ dayIndex, slotIndex, isEmpty: !cellData });
        setNewSubjectCode(''); // Reset new subject code input when clicking a new cell
    };

    const updateCellDetails = (field, value) => {
        const { dayIndex, slotIndex } = activeCell;
        const key = `${dayIndex}-${slotIndex}`;
        setTimetableData(prev => ({
            ...prev,
            [key]: { ...prev[key], [field]: value }
        }));
    };

    const addNewSubject = () => {
        if (newSubjectCode.trim() === '') {
            alert('Please enter a valid subject code');
            return;
        }
        const { dayIndex, slotIndex } = activeCell;
        const key = `${dayIndex}-${slotIndex}`;
        const slot = timetableSlots[dayIndex][slotIndex];
        setTimetableData(prev => ({
            ...prev,
            [key]: { code: newSubjectCode.trim(), teacher: '', classroom: '', type: 'lecture' }
        }));
        setActiveCell(prev => ({ ...prev, isEmpty: false }));
        setNewSubjectCode('');
    };
    const deleteCell = (dayIndex, slotIndex) => {
        const key = `${dayIndex}-${slotIndex}`;
        setTimetableData(prev => {
            const newData = { ...prev };
            delete newData[key];
            return newData;
        });
        setActiveCell(null);
    };

    const updateBatchData = (slot, field, value) => {
        setBatchUpdateData(prev => ({
            ...prev,
            [slot]: { ...prev[slot], [field]: value }
        }));
    };

    const submitBatchUpdate = (slot) => {
        setTimetableData(prev => {
            const newData = { ...prev };
            timetableSlots.forEach((row, dayIndex) => {
                row.forEach((cellSlot, slotIndex) => {
                    if (cellSlot === slot) {
                        const key = `${dayIndex}-${slotIndex}`;
                        if (newData[key]) {
                            newData[key] = {
                                ...newData[key],
                                ...batchUpdateData[slot]
                            };
                        }
                    }
                });
            });
            return newData;
        });
        setBatchUpdateData(prev => {
            const newData = { ...prev };
            delete newData[slot];
            return newData;
        });
    };

    const handlePrint = () => {
        const timetableElement = timetableRef.current;
        if (timetableElement) {
            timetableElement.classList.add('printable');
            window.print();
            timetableElement.classList.remove('printable');
        }
    };

    const filteredSlotToCode = Object.entries(slottocode).reduce((acc, [slot, codes]) => {
        acc[slot] = codes.filter(code =>
            code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (codetoname[code] && codetoname[code].toLowerCase().includes(searchTerm.toLowerCase()))
        );
        return acc;
    }, {});

    const timetableSlots = [
        ['E1', 'E1', 'E8', 'E8', 'E9', 'E9', 'E7', 'E7', 'E2', 'E2'],
        ['E5', 'E5', 'E8', 'E8', 'E10', 'E10', 'E7', 'E7', 'E6', 'E6'],
        ['E1', 'E5', 'E4', 'E4', 'E9', 'E10', 'E3', 'E3', 'Z', 'Z'],
        ['E5', 'E5', 'E4', 'E8', 'E9', 'E9', 'E7', 'E3', 'E6', 'E6'],
        ['E1', 'E1', 'E4', 'E4', 'E10', 'E10', 'E3', 'E3', 'E2', 'E2']
    ];

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">DTU Timetable Generator</h1>

            <div className="mb-4 flex items-center bg-white rounded-lg shadow-md p-2">
                <input
                    type="text"
                    placeholder="Enter Roll Number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleRollNumberSearch}
                    className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition-colors duration-200"
                >
                    <Search size={24} />
                </button>
            </div>

            {studentSubjects.length > 0 && (
                <div className="mb-4 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Subjects</h2>
                    {studentSubjects.map(subject => (
                        <div key={subject} className="mb-2 flex items-center">
                            <span className="mr-2">{subject} - {codetoname[subject] || ''}</span>
                            <select
                                value={selectedSlots[subject] || ''}
                                onChange={(e) => handleSlotSelection(subject, e.target.value)}
                                className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Slot</option>
                                {codetoslot[subject]?.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button
                        onClick={fillTimetable}
                        className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200"
                    >
                        Fill Timetable
                    </button>
                </div>
            )}
            <div className="mb-4 flex items-center justify-center">
                <label className="mr-4 font-semibold text-gray-700">Show Subject Names</label>
                <input
                    type="checkbox"
                    checked={showSubjectNames}
                    onChange={() => setShowSubjectNames(!showSubjectNames)}
                    className="w-6 h-6 text-blue-500"
                />
            </div>


            <div className='timeTableClass2 mb-8 bg-white rounded-lg shadow-md p-4'>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Timetable</h2>
                <div ref={timetableRef} className=" TimetableClass">
                    <div >
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="border p-2"></th>
                                    {['8-9', '9-10', '10-11', '11-12', '12-1', '1-2', '2-3', '3-4', '4-5', '5-6'].map(time => (
                                        <th key={time} className="border p-2">{time}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, dayIndex) => (
                                    <tr key={day} className={dayIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <th className="border p-2 font-semibold text-gray-700">{day}</th>
                                        {timetableSlots[dayIndex].map((slot, slotIndex) => {
                                            const cellData = timetableData[`${dayIndex}-${slotIndex}`];
                                            const baseColor = slotColors[slot] || '#FFFFFF';
                                            const cellColor = cellData
                                                ? (cellData.type === 'lab' ? adjustColor(baseColor, -20) : baseColor)
                                                : '#FFFFFF';
                                            const cellStyle = cellData
                                                ? { backgroundColor: cellColor, border: '1px solid #000' }
                                                : { backgroundColor: '#FFFFFF', border: '1px solid #ddd' };
                                            return (
                                                <td key={slotIndex} className="p-2 text-center" style={cellStyle}>
                                                    {slot === 'Z' ? (
                                                        <span className="text-gray-400">Zero Hour</span>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleCellClick(dayIndex, slotIndex)}
                                                            className="w-full h-full p-4 rounded transition-colors duration-200"
                                                        >
                                                            {cellData && (
                                                                <>
                                                                    <p className={`font-semibold ${showSubjectNames ? 'text-sm' : ''}`}>{cellData.code}</p>
                                                                    {showSubjectNames && (
                                                                        <p className="text-xs text-gray-700">{codetoname[cellData.code]}</p>
                                                                    )}
                                                                </>
                                                            )}                                                            {cellData && (
                                                                <div className="text-xs">
                                                                    <div>{cellData.teacher}</div>
                                                                    <div>{cellData.classroom}</div>
                                                                    <div>{cellData.type}</div>
                                                                </div>
                                                            )}
                                                        </button>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button
                    onClick={handlePrint}
                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
                >
                    <Printer className="mr-2" size={20} />
                    Print Timetable
                </button>
            </div>

            {activeCell && (
                <div className="mb-4 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Update Cell Details</h3>
                    <div className="space-y-2">
                        {activeCell.isEmpty ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Subject Code"
                                    value={newSubjectCode}
                                    onChange={(e) => setNewSubjectCode(e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={addNewSubject}
                                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200"
                                >
                                    OK
                                </button>
                                <p className="text-sm text-gray-600">Enter a subject code and click OK to add a new subject to this cell.</p>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Teacher Name"
                                    value={timetableData[`${activeCell.dayIndex}-${activeCell.slotIndex}`]?.teacher || ''}
                                    onChange={(e) => updateCellDetails('teacher', e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Classroom"
                                    value={timetableData[`${activeCell.dayIndex}-${activeCell.slotIndex}`]?.classroom || ''}
                                    onChange={(e) => updateCellDetails('classroom', e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <select
                                    value={timetableData[`${activeCell.dayIndex}-${activeCell.slotIndex}`]?.type || 'lecture'}
                                    onChange={(e) => updateCellDetails('type', e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="lecture">Lecture</option>
                                    <option value="lab">Lab</option>
                                </select>
                                <button
                                    onClick={() => deleteCell(activeCell.dayIndex, activeCell.slotIndex)}
                                    className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-200"
                                >
                                    Delete Cell
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="mb-4 flex items-center bg-white rounded-lg shadow-md p-2">
                <p>Compulsory Subjects can be manually added by clicking empty cells.</p>
                <p>Currently, all slots are being populated on subject selection, click on the period to delete slot, change classroom, faculty details or navigate to slot form to make bulk changes based on the official time table.</p>
                <button
                    onClick={() => window.open('https://drive.google.com/drive/folders/1jLgWRiJo21AUesZbc_rOZTkKvl0CNcSt?usp=sharing', '_blank')}
                    className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition-colors duration-200 m-1"
                >
                    Official Time Tables
                </button>
                <button
                    onClick={() => window.open('https://bit.ly/dtugroups', '_blank')}
                    className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition-colors duration-200 m-1"
                >
                    WhatsApp Groups
                </button>
            </div>

            <div className="mb-4 flex items-center bg-white rounded-lg shadow-md p-2">
                <input
                    type="text"
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition-colors duration-200">
                    <Search size={24} />
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Subject Selection</h2>
                <div className="space-y-4">
                    {Object.entries(filteredSlotToCode).map(([slot, codes]) => (
                        <div key={slot} className="bg-gray-50 p-3 rounded-md">
                            <h3 className="font-semibold text-lg mb-2 text-blue-600">{slot}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {codes.map(code => (
                                    <button
                                        key={code}
                                        onClick={() => toggleSubject(slot, code)}
                                        className={`px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${Object.values(timetableData).some(cell => cell.code === code)
                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                            }`}
                                    >
                                        {code} - {codetoname[code] || ''}
                                    </button>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Teacher Name (All instances)"
                                    value={batchUpdateData[slot]?.teacher || ''}
                                    onChange={(e) => updateBatchData(slot, 'teacher', e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Classroom (All instances)"
                                    value={batchUpdateData[slot]?.classroom || ''}
                                    onChange={(e) => updateBatchData(slot, 'classroom', e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <select
                                    value={batchUpdateData[slot]?.type || ''}
                                    onChange={(e) => updateBatchData(slot, 'type', e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Type (All instances)</option>
                                    <option value="lecture">Lecture</option>
                                    <option value="lab">Lab</option>
                                </select>
                                <button
                                    onClick={() => submitBatchUpdate(slot)}
                                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200"
                                >
                                    Update All {slot} Slots
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-4 mt-4 bg-white rounded-lg shadow-md p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Credits</h2>
                <h3>
                    Madhav Gupta : 2K21/CO/262{' '}
                    <a href='https://www.linkedin.com/in/madhavgupta2002/'>
                        <FontAwesomeIcon style={{ position: 'relative', top: 5 }} icon={faLinkedin} size="2x" color="#0e76a8" />
                    </a>
                </h3>
                <h3>
                    Mrinal Deb : 2K21/CO/292{' '}
                    <a href='https://www.linkedin.com/in/mrinal-deb/'>
                        <FontAwesomeIcon style={{ position: 'relative', top: 5 }} icon={faLinkedin} size="2x" color="#0e76a8" />
                    </a>
                </h3>
            </div>
        </div>
    );
};

// Helper function to adjust color brightness
const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
};

export default TimetableGenerator;