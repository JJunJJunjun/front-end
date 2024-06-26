import React, { useEffect, useState } from 'react';
import TopMenu from '../topmenu/topmenu';
import './CalendarPage.css';
import { useLocation,useNavigate } from 'react-router-dom';


const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
function CalendarPage() {
    const location = useLocation();
    // 'setDate' 제거
    const [date] = useState(new Date());
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [currMonth, setCurrMonth] = useState(date.getMonth());
    const [days, setDays] = useState([]);
    const [showSelectMenu, setShowSelectMenu] = useState(false);
    const [selectedDate, setSelectedDate] = useState({ month: '', day: '' });
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const [showButton1, setShowButton1] = useState(false);
    const [showButton2, setShowButton2] = useState(false);
    const [showButton3, setShowButton3] = useState(false);
    const [showButton4, setShowButton4] = useState(false);
    const [showButton5, setShowButton5] = useState(false);
    const [showButton6, setShowButton6] = useState(false);

    const diet = { /*식단 입력받는곳*/
        menu1: 'menu1',
        menu2: 'menu2',
        menu3: 'menu3',
        menu4: 'menu4',
        menu5: 'menu5',
        menu6: 'menu6',
        calorie: 'calorie',
        carbohydrate:'carbohydrate', 
        protein:'protein',
        fat:'fat'
    };

    useEffect(() => {
        if (location.state && location.state.selectedDate) {
            const [year, month] = location.state.selectedDate.split('/');
            setCurrYear(parseInt(year));
            setCurrMonth(parseInt(month) - 1); /* getMonth는 0부터 시작하므로 1을 빼줍니다.*/
        }

        const renderCalendar = () => {
            let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
            let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
            let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
            let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
            
            let daysArray = [];
            for (let i = firstDayofMonth; i > 0; i--) {
                daysArray.push({ day: lastDateofLastMonth - i + 1, isActive: false });
            }

            for (let i = 1; i <= lastDateofMonth; i++) {
                daysArray.push({ day: i, isActive: false, isCurrentMonth: true });
            }

            for (let i = lastDayofMonth; i < 6; i++) {
                daysArray.push({ day: i - lastDayofMonth + 1, isActive: false });
            }

            setDays(daysArray);
        };

        renderCalendar();
    }, [location, currMonth, currYear]);

    const handleDayClick = (day) => {
        if (day.isCurrentMonth) {
            /* 이번 달의 날짜를 클릭했을 때 sellectmenu 창을 표시합니다.*/
            setShowSelectMenu(true);
            setSelectedDate({ month: months[currMonth], day: day.day });
        }
    };
    const handleCloseClick = () => {
        setShowSelectMenu(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleLeftButtonClick = () => {
        setSelectedDate(prevDate => {
            if (prevDate.day === 1) {
                return prevDate;
            }    
            return {
                ...prevDate,
                day: prevDate.day - 1
            };
        });
    };
    const handleRightButtonClick = () => {
        setSelectedDate(prevDate => {
            /* 현재 월의 마지막 날짜를 얻습니다.*/
            const lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
            
            if (prevDate.day >= lastDayOfMonth) {
                /* 현재 값이 마지막 날짜 이상이므로 값을 변경하지 않습니다.*/
                return prevDate;
            }
    
            return {
                ...prevDate,
                day: prevDate.day + 1
            };
        });
    };
    const savemenu = () => {
        /* 저장하는 로직을 구현합니다.*/
        setShowSelectMenu(false);


    };
    const SaveCalendar = () => {
        /* 저장하는 로직을 구현합니다.*/
    
        /* 저장 후 DietCalendar 페이지로 이동*/
        navigate('/dietcalendar');
    };
        // inputtext 입력 필드의 현재 값을 저장하는 상태입니다.
    const [inputtext, setInputtext] = useState('');

    // searchData는 검색 버튼을 클릭했을 때 표시할 값을 저장하는 상태입니다.
    const [searchData, setSearchData] = useState('');

    // handleInputChange는 입력 필드의 값이 변경될 때 호출되는 함수입니다.
    // 이 함수는 입력 필드의 값을 inputValue 상태에 저장합니다.
    const handleInputSearch = (event) => {
        inputtext(event.target.value);
    };

    // handleButtonClick는 검색 버튼을 클릭했을 때 호출되는 함수입니다.
    // 이 함수는 inputValue의 값을 searchData 상태에 저장하여 화면에 표시합니다.
    const handleButtonClick = () => {
        setSearchData(inputValue);
    };

    


    return (
        <div>
        <TopMenu />
        <div className="wrapper">
            
            <header>
                <div className="nav">
                    <p className="current-date">{`${currYear}년 ${months[currMonth]}`}</p>
                    <div>제목을 입력하세요:<input type="text" value={inputValue} onChange={handleInputChange} /></div>
                </div>
            </header>
            
            <div className="calendar">
                <div className="weeks">
                    <div >일</div>
                    <div >월</div>
                    <div >화</div>
                    <div >수</div>
                    <div >목</div>
                    <div >금</div>
                    <div >토</div>
                </div>
                <div className="days">
                    {days.map((day, index) => (
                        <div  key={index} href="#" onClick={() => handleDayClick(day)} className={`${day.isActive ? 'active' : day.isCurrentMonth
                        ? 'current-month' :  'inactive'} ${!day.isCurrentMonth ? 'non-current-month' : ''}`}>
                            {day.day}     
                            <div className='menu'>
                                <div>{diet.menu1}</div>
                                <div>{diet.menu2}</div>
                                <div>{diet.menu3}</div>
                                <div>{diet.menu4}</div>
                                <div>{diet.menu5}</div>
                                <div>{diet.menu6}</div>
                                <div>{diet.calorie}</div>
                            </div>                        
                        </div>
                    ))}
                    
                </div>
            </div>
            <div>
                <button className='Button-save' onClick={SaveCalendar}>식단 저장하기</button>
            </div>
            {showSelectMenu && <div className='sellectmenu'>
            <button className='Close' onClick={handleCloseClick}>X</button>
            <div className='MD'>
            <button className='Left-B'onClick={handleLeftButtonClick}>&lt;</button>
                {selectedDate.month} {selectedDate.day}일                
                <button className='Right-B'onClick={handleRightButtonClick}>&gt;</button>
            </div>
            <div className='MenuContainer'>
                <div className='MenuText'>
                <div className='MenuText-b'>
                    <div className='MenuText-f'>밥</div>
                    <div className='MenuText-l' onMouseEnter={() => setShowButton1(true)} onMouseLeave={() => setShowButton1(false)}>
                    {diet.menu1}
                    {showButton1 && <button className='goButton'>레시피 바로가기</button>}
                </div>
                </div> 
                <div className='MenuText-b'>
                    <div className='MenuText-f'>국&찌개</div>
                    <div className='MenuText-l' onMouseEnter={() => setShowButton2(true)} onMouseLeave={() => setShowButton2(false)}>
                    {diet.menu2}
                    {showButton2 && <button className='goButton'>레시피 바로가기</button>}
                </div>
                </div> 
                <div className='MenuText-b'>
                    <div className='MenuText-f'>일품</div>
                    <div className='MenuText-l' onMouseEnter={() => setShowButton3(true)} onMouseLeave={() => setShowButton3(false)}>
                    {diet.menu3}
                    {showButton3 && <button className='goButton'>레시피 바로가기</button>}
                </div>
                </div> 
                <div className='MenuText-b'>
                    <div className='MenuText-f'>반찬</div>
                    <div className='MenuText-l' onMouseEnter={() => setShowButton4(true)} onMouseLeave={() => setShowButton4(false)}>
                    {diet.menu4}
                    {showButton4 && <button className='goButton'>레시피 바로가기</button>}
                </div>
                </div> 
                <div className='MenuText-b'>
                    <div className='MenuText-f'>나물/샐러드</div>
                    <div className='MenuText-l' onMouseEnter={() => setShowButton5(true)} onMouseLeave={() => setShowButton5(false)}>
                    {diet.menu5}
                    {showButton5 && <button className='goButton'>레시피 바로가기</button>}
                </div>
                </div> 
                <div className='MenuText-b'>
                    <div className='MenuText-f'>김치</div>
                    <div className='MenuText-l' onMouseEnter={() => setShowButton6(true)} onMouseLeave={() => setShowButton6(false)}>
                    {diet.menu6}
                    {showButton6 && <button className='goButton'>레시피 바로가기</button>}
                </div>
                </div> 
                <div className='MenuText-b'>
                <div>총칼로리:</div><div>{diet.calorie}</div><div>{diet.carbohydrate}</div><div>{diet.protein}</div><div>{diet.fat}</div>
                </div>
                </div>
                    <div className='MenuSearch'>
                        <input 
                        className='InputText'
                        type='text' 
                        placeholder='음식을 입력하세요'
                        value={inputValue}
                        onChange={handleInputSearch}
                        />
                        <button className='textsearch' onClick={handleButtonClick}></button>
                        <div className='SearchData'>{searchData}</div>
                    </div>
                
            </div>
            <div className='Button-sss'>
                    <button className='Button-ss'onClick={savemenu}>수정하기</button>
            </div>
                
            </div>}
        </div>
        </div>
        
        
    );
}

export default CalendarPage;