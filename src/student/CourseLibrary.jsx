import { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseLibrary.css';
import { useNavigate } from 'react-router-dom';

function CourseLibrary() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/myadverts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const user = await axios.get('/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setUsername(user.data.data.name);

                const courseList = response.data.adverts.map(advert => advert.course);
                setCourses(courseList);
                console.log(courseList);

                setLoading(false);
            } catch (err) {
                setError('Failed to load courses. Please try again later.');
                setLoading(false);
                console.error('Error fetching courses:', err);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
    };

    return (
        <div className="courses-dashboard">
            <header className="dashboard-header">
                <h1>My Courses</h1>
                <div className="user-profile">
                    <span className="user-name">{username}</span>
                    <button className="home-button" onClick={() => navigate('/')}>Home</button>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="courses-sidebar">
                    <h2>Purchased Courses</h2>
                    {loading ? (
                        <div className="loading-indicator">Loading courses...</div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : (
                        <ul className="courses-list">
                            {courses.map((course) => (
                                <li
                                    key={course.id}
                                    className={`course-item ${selectedCourse && selectedCourse.id === course.id ? 'selected' : ''}`}
                                    onClick={() => handleCourseSelect(course)}
                                >
                                    <h3>{course.title}</h3>
                                    <p className="course-profession">{course.profession}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </aside>

                <main className="course-details">
                    {selectedCourse ? (
                        <>
                            <div className="course-header">
                                <h2>{selectedCourse.title}</h2>
                                <span className="course-price">{selectedCourse.price}₺</span>
                            </div>

                            <div className="course-info">
                                <p className="course-description">{selectedCourse.description}</p>

                                <div className="course-meta">
                                    <div className="meta-item">
                                        <span className="meta-label">Lesson:</span>
                                        <span className="meta-value">{selectedCourse.lesson}</span>
                                    </div>

                                    <div className="meta-item">
                                        <span className="meta-label">Location:</span>
                                        <span className="meta-value">{selectedCourse.location}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Profession:</span>
                                        <span className="meta-value">{selectedCourse.profession}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="course-lessons">
                                <h3>Lessons</h3>
                                <ul className="lessons-list">
                                    {selectedCourse.lessons && selectedCourse.lessons.map((lesson) => (
                                        <li key={lesson.id} className="lesson-item">
                                            <div className="lesson-title">{lesson.title}</div>
                                            <div className="lesson-duration">{lesson.duration}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="no-course-selected">
                            <p>Select a course to view details</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default CourseLibrary;
