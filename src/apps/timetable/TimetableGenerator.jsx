import React, { useState, useRef, useEffect } from 'react';
import { Search, Printer, Linkedin, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrintCredit } from '@/components/print-credit';
import codetoname from './data/codetoname';
import slottocode from './data/slottocode';
import regData from './data/regData.json';
import codetoslot from './data/codetoslot';

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
    const [branchFilter, setBranchFilter] = useState('ALL');
    const [rollNotFound, setRollNotFound] = useState(false);
    const timetableRef = useRef(null);

    // Define a color mapping for slots
    const slotColors = {
        // Muted, print-friendly slot tints (one per elective slot).
        E1: '#F2D7CF', E2: '#DCE5D2', E3: '#D6E0EA', E4: '#F1E6C4',
        E5: '#EED9C4', E6: '#E2D8E8', E7: '#D3E4DE', E8: '#EBD3DA',
        E9: '#D5E6E8', E10: '#E6DDD0', Z: '#E8E6E1'
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
        setRollNotFound(rollNumber.trim() !== '' && subjects.length === 0);
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

    const branchOf = (code) => (code.match(/^[A-Za-z]+/) || ['OTHER'])[0].toUpperCase();
    const branches = Array.from(new Set(Object.values(slottocode).flat().map(branchOf))).sort();
    const filteredSlotToCode = Object.entries(slottocode).reduce((acc, [slot, codes]) => {
        const q = searchTerm.toLowerCase();
        acc[slot] = codes.filter(code =>
            (branchFilter === 'ALL' || branchOf(code) === branchFilter) &&
            (code.toLowerCase().includes(q) ||
            (codetoname[code] && codetoname[code].toLowerCase().includes(q)))
        );
        return acc;
    }, {});
    const isFiltering = searchTerm.trim() !== '' || branchFilter !== 'ALL';
    const selectedCodes = new Set(Object.values(timetableData).map(cell => cell.code));

    const timetableSlots = [
        ['E1', 'E1', 'E8', 'E8', 'E9', 'E9', 'E7', 'E7', 'E2', 'E2'],
        ['E5', 'E5', 'E8', 'E8', 'E10', 'E10', 'E7', 'E7', 'E6', 'E6'],
        ['E1', 'E5', 'E4', 'E4', 'E9', 'E10', 'E3', 'E3', 'Z', 'Z'],
        ['E5', 'E5', 'E4', 'E8', 'E9', 'E9', 'E7', 'E3', 'E6', 'E6'],
        ['E1', 'E1', 'E4', 'E4', 'E10', 'E10', 'E3', 'E3', 'E2', 'E2']
    ];

    const inputCls = 'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
    const labelCls = 'mb-1 block text-sm font-medium';
    const cardCls = 'mb-4 rounded-lg border bg-card p-4 text-card-foreground';
    const cellKey = activeCell ? `${activeCell.dayIndex}-${activeCell.slotIndex}` : null;
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
    const times = ['8-9', '9-10', '10-11', '11-12', '12-1', '1-2', '2-3', '3-4', '4-5', '5-6'];

    return (
        <div className="mx-auto max-w-7xl px-4 py-4">
            <h1 className="mb-4 text-xl font-bold sm:text-2xl">DTU Timetable Generator</h1>

            <section className={cardCls} aria-labelledby="roll-heading">
                <h2 id="roll-heading" className="mb-3 text-lg font-semibold">Find your subjects</h2>
                <form
                    className="flex gap-2"
                    onSubmit={(e) => { e.preventDefault(); handleRollNumberSearch(); }}
                >
                    <div className="min-w-0 flex-1">
                        <label htmlFor="roll-number" className="sr-only">Roll number</label>
                        <input
                            id="roll-number"
                            type="text"
                            placeholder="Roll number, e.g. 2K21/CO/262"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            className={inputCls}
                        />
                    </div>
                    <Button type="submit" size="icon" aria-label="Search roll number">
                        <Search className="h-5 w-5" aria-hidden="true" />
                    </Button>
                </form>
                {rollNotFound && (
                    <p className="mt-2 text-sm text-destructive" role="status">No registration data found for that roll number.</p>
                )}

                {studentSubjects.length > 0 && (
                    <div className="mt-4">
                        <h3 className="mb-2 font-semibold">Your subjects</h3>
                        <ul className="space-y-2">
                            {studentSubjects.map(subject => (
                                <li key={subject} className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-background p-2">
                                    <label htmlFor={`slot-${subject}`} className="min-w-0 text-sm">
                                        <span className="font-medium">{subject}</span>
                                        {codetoname[subject] ? <span className="text-muted-foreground"> - {codetoname[subject]}</span> : null}
                                    </label>
                                    <select
                                        id={`slot-${subject}`}
                                        value={selectedSlots[subject] || ''}
                                        onChange={(e) => handleSlotSelection(subject, e.target.value)}
                                        className={`${inputCls} w-auto py-1`}
                                    >
                                        <option value="">Select slot</option>
                                        {codetoslot[subject]?.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </li>
                            ))}
                        </ul>
                        <Button onClick={fillTimetable} className="mt-4">Fill Timetable</Button>
                    </div>
                )}
            </section>

            <section className={cardCls} aria-labelledby="tt-heading">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <h2 id="tt-heading" className="text-lg font-semibold">Timetable</h2>
                    <div className="flex items-center gap-2">
                        <input
                            id="show-names"
                            type="checkbox"
                            checked={showSubjectNames}
                            onChange={() => setShowSubjectNames(!showSubjectNames)}
                            className="h-4 w-4 accent-primary"
                        />
                        <label htmlFor="show-names" className="text-sm font-medium">Show subject names</label>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-lg border">
                    <div ref={timetableRef} className="TimetableClass">
                        <table className="w-full min-w-[900px] border-collapse text-sm">
                            <thead>
                                <tr className="bg-foreground text-background">
                                    <th scope="col" className="border border-border p-2"><span className="sr-only">Day</span></th>
                                    {times.map(time => (
                                        <th key={time} scope="col" className="min-w-[80px] whitespace-nowrap border border-border p-2 font-medium">{time}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {days.map((day, dayIndex) => (
                                    <tr key={day} className={dayIndex % 2 === 0 ? 'bg-muted/40' : 'bg-card'}>
                                        <th scope="row" className="border border-border p-2 font-semibold">{day}</th>
                                        {timetableSlots[dayIndex].map((slot, slotIndex) => {
                                            const cellData = timetableData[`${dayIndex}-${slotIndex}`];
                                            const baseColor = slotColors[slot] || '#FFFFFF';
                                            // Pastel slot colours are data; filled cells always use dark text so they stay readable in dark mode.
                                            const cellStyle = cellData
                                                ? { backgroundColor: cellData.type === 'lab' ? adjustColor(baseColor, -20) : baseColor, color: '#1c1a17' }
                                                : undefined;
                                            return (
                                                <td key={slotIndex} className="border border-border p-1 text-center align-middle" style={cellStyle}>
                                                    {slot === 'Z' ? (
                                                        <span className="text-xs text-muted-foreground">Zero Hour</span>
                                                    ) : (
                                                        <button
                                                            style={cellData ? { color: '#1c1a17' } : undefined}
                                                            onClick={() => handleCellClick(dayIndex, slotIndex)}
                                                            aria-label={cellData
                                                                ? `${day} ${times[slotIndex]}: ${cellData.code}, edit`
                                                                : `${day} ${times[slotIndex]} (slot ${slot}): empty, add subject`}
                                                            className="h-full min-h-[3.5rem] w-full rounded-md p-2 transition-colors ring-offset-background hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                        >
                                                            {cellData && (
                                                                <>
                                                                    <p className={`font-semibold ${showSubjectNames ? 'text-sm' : ''}`}>{cellData.code}</p>
                                                                    {showSubjectNames && (
                                                                        <p className="text-xs">{codetoname[cellData.code]}</p>
                                                                    )}
                                                                    <div className="text-xs">
                                                                        <div>{cellData.teacher}</div>
                                                                        <div>{cellData.classroom}</div>
                                                                        <div>{cellData.type}</div>
                                                                    </div>
                                                                </>
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
                        <PrintCredit className="mt-2" />
                    </div>
                </div>
                <Button variant="outline" onClick={handlePrint} className="mt-4">
                    <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
                    Print Timetable
                </Button>
            </section>

            {activeCell && (
                <section className={cardCls} aria-labelledby="cell-heading">
                    <h3 id="cell-heading" className="mb-3 text-lg font-semibold">
                        Update cell: {days[activeCell.dayIndex]} {times[activeCell.slotIndex]}
                    </h3>
                    {activeCell.isEmpty ? (
                        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); addNewSubject(); }}>
                            <div>
                                <label htmlFor="new-code" className={labelCls}>Subject code</label>
                                <input id="new-code" type="text" value={newSubjectCode} onChange={(e) => setNewSubjectCode(e.target.value)} className={inputCls} />
                            </div>
                            <p className="text-sm text-muted-foreground">Enter a subject code and click OK to add a new subject to this cell.</p>
                            <Button type="submit">OK</Button>
                        </form>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div>
                                <label htmlFor="cell-teacher" className={labelCls}>Teacher</label>
                                <input id="cell-teacher" type="text" value={timetableData[cellKey]?.teacher || ''} onChange={(e) => updateCellDetails('teacher', e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label htmlFor="cell-room" className={labelCls}>Classroom</label>
                                <input id="cell-room" type="text" value={timetableData[cellKey]?.classroom || ''} onChange={(e) => updateCellDetails('classroom', e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label htmlFor="cell-type" className={labelCls}>Type</label>
                                <select id="cell-type" value={timetableData[cellKey]?.type || 'lecture'} onChange={(e) => updateCellDetails('type', e.target.value)} className={inputCls}>
                                    <option value="lecture">Lecture</option>
                                    <option value="lab">Lab</option>
                                </select>
                            </div>
                            <div className="sm:col-span-3">
                                <Button variant="destructive" onClick={() => deleteCell(activeCell.dayIndex, activeCell.slotIndex)}>Delete Cell</Button>
                            </div>
                        </div>
                    )}
                </section>
            )}

            <section className={cardCls} aria-label="Help and links">
                <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Compulsory subjects can be manually added by clicking empty cells.</p>
                    <p>Currently, all slots are populated on subject selection. Click a period to delete it or change classroom and faculty details, or use the slot forms below to make bulk changes based on the official timetable.</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    <Button asChild variant="secondary" size="sm">
                        <a href="https://drive.google.com/drive/folders/1jLgWRiJo21AUesZbc_rOZTkKvl0CNcSt?usp=sharing" target="_blank" rel="noopener noreferrer">
                            Official Time Tables <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                        </a>
                    </Button>
                    <Button asChild variant="secondary" size="sm">
                        <a href="https://bit.ly/dtugroups" target="_blank" rel="noopener noreferrer">
                            WhatsApp Groups <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                        </a>
                    </Button>
                </div>
            </section>

            <section className={cardCls} aria-labelledby="subj-heading">
                <h2 id="subj-heading" className="mb-3 text-lg font-semibold">Subject Selection</h2>
                <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_200px]">
                    <div>
                        <label htmlFor="subject-search" className={labelCls}>Search subjects</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                            <input id="subject-search" type="search" placeholder="Code or name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`${inputCls} pl-9`} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="branch-filter" className={labelCls}>Branch</label>
                        <select id="branch-filter" value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className={inputCls}>
                            <option value="ALL">All branches</option>
                            {branches.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                </div>
                <div className="space-y-3">
                    {Object.entries(filteredSlotToCode).map(([slot, codes]) => {
                        if (isFiltering && codes.length === 0) return null;
                        const chosen = codes.filter(c => selectedCodes.has(c)).length;
                        return (
                            <details key={slot} open={isFiltering || undefined} className="group rounded-lg border bg-background">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg p-3 font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                                    <span>
                                        <span className="text-primary">{slot}</span>
                                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                                            {codes.length} subjects{chosen ? `, ${chosen} selected` : ''}
                                        </span>
                                    </span>
                                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                                </summary>
                                <div className="border-t p-3">
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {codes.map(code => {
                                            const on = selectedCodes.has(code);
                                            return (
                                                <Button
                                                    key={code}
                                                    size="sm"
                                                    variant={on ? 'default' : 'secondary'}
                                                    aria-pressed={on}
                                                    onClick={() => toggleSubject(slot, code)}
                                                    className="h-auto whitespace-normal py-1.5 text-left"
                                                >
                                                    {code}{codetoname[code] ? ` - ${codetoname[code]}` : ''}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-4 sm:items-end">
                                        <div>
                                            <label htmlFor={`bt-${slot}`} className={labelCls}>Teacher (all {slot})</label>
                                            <input id={`bt-${slot}`} type="text" value={batchUpdateData[slot]?.teacher || ''} onChange={(e) => updateBatchData(slot, 'teacher', e.target.value)} className={inputCls} />
                                        </div>
                                        <div>
                                            <label htmlFor={`bc-${slot}`} className={labelCls}>Classroom (all {slot})</label>
                                            <input id={`bc-${slot}`} type="text" value={batchUpdateData[slot]?.classroom || ''} onChange={(e) => updateBatchData(slot, 'classroom', e.target.value)} className={inputCls} />
                                        </div>
                                        <div>
                                            <label htmlFor={`bty-${slot}`} className={labelCls}>Type (all {slot})</label>
                                            <select id={`bty-${slot}`} value={batchUpdateData[slot]?.type || ''} onChange={(e) => updateBatchData(slot, 'type', e.target.value)} className={inputCls}>
                                                <option value="">Unchanged</option>
                                                <option value="lecture">Lecture</option>
                                                <option value="lab">Lab</option>
                                            </select>
                                        </div>
                                        <Button variant="outline" onClick={() => submitBatchUpdate(slot)}>Update all {slot} slots</Button>
                                    </div>
                                </div>
                            </details>
                        );
                    })}
                </div>
            </section>

            <section className={cardCls} aria-labelledby="credits-heading">
                <h2 id="credits-heading" className="mb-3 text-lg font-semibold">Credits</h2>
                <ul className="space-y-2 text-sm">
                    {[
                        ['Madhav Gupta', '2K21/CO/262', 'https://www.linkedin.com/in/madhavgupta2002/'],
                        ['Mrinal Deb', '2K21/CO/292', 'https://www.linkedin.com/in/mrinal-deb/'],
                    ].map(([name, roll, url]) => (
                        <li key={name} className="flex items-center gap-2">
                            <span>{name} : {roll}</span>
                            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                                <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`}>
                                    <Linkedin className="h-4 w-4 text-primary" aria-hidden="true" />
                                </a>
                            </Button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

// Helper function to adjust color brightness
const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
};

export default TimetableGenerator;