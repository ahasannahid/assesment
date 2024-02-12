// import React from 'react';

// const Problem2 = () => {

//     return (

//         <div className="container">
//             <div className="row justify-content-center mt-5">
//                 <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
//                 <div className="d-flex justify-content-center gap-3">
//                 <button className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
//                 <button className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
//                 </div>
                
//             </div>
//         </div>
//     );
// };

// export default Problem2;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';

const Problem2 = () => {
    const [modalA, setModalA] = useState(false);
    const [modalB, setModalB] = useState(false);
    const [modalC, setModalC] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [usContacts, setUsContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [onlyEven, setOnlyEven] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchContacts = async () => {
        // Fetch all contacts
        const response = await fetch('https://contact.mediusware.com/api/v1/contacts');
        const data = await response.json();
        setContacts(data.contacts);

        // Fetch US contacts
        const usResponse = await fetch('https://contact.mediusware.com/api/v1/contacts?country=US');
        const usData = await usResponse.json();
        setUsContacts(usData.contacts);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        filterContacts();
    }, [contacts, usContacts, onlyEven, searchTerm]);

    const filterContacts = () => {
        let filtered = [...contacts, ...usContacts];

        // Filter by even ID if onlyEven is checked
        if (onlyEven) {
            filtered = filtered.filter(contact => contact.id % 2 === 0);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(contact =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredContacts(filtered);
    };

    const handleCloseModalA = () => setModalA(false);
    const handleCloseModalB = () => setModalB(false);
    const handleCloseModalC = () => setModalC(false);

    const handleOpenModalA = () => {
        setModalA(true);
        setModalB(false);
    };

    const handleOpenModalB = () => {
        setModalB(true);
        setModalA(false);
    };

    const handleOpenModalC = () => setModalC(true);

    const handleCheckboxChange = () => setOnlyEven(!onlyEven);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleScroll = (e) => {
        const bottom =
            e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <Button className="btn btn-lg btn-outline-primary" onClick={handleOpenModalA}>All Contacts</Button>
                    <Button className="btn btn-lg btn-outline-warning" onClick={handleOpenModalB}>US Contacts</Button>
                </div>
                <Modal show={modalA} onHide={handleCloseModalA}>
                    <Modal.Header closeButton>
                        <Modal.Title>All Contacts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                           
                            <FormGroup className="mb-3" controlId="formBasicSearch">
                                <FormControl type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                            </FormGroup>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }} onScroll={handleScroll}>
                                {/* Render contacts */}
                            </div>
                            <FormGroup className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Only even" checked={onlyEven} onChange={handleCheckboxChange} />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleOpenModalA}>All Contacts</Button>
                        <Button variant="secondary" onClick={handleOpenModalB}>US Contacts</Button>
                        <Button variant="danger" onClick={handleCloseModalA}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modalB} onHide={handleCloseModalB}>
                    <Modal.Header closeButton>
                        <Modal.Title>US Contacts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            
                            <FormGroup className="mb-3" controlId="formBasicSearch">
                                <FormControl type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                            </FormGroup>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }} onScroll={handleScroll}>
                                {/* Render US contacts */}
                            </div>

                            <FormGroup className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Only even" checked={onlyEven} onChange={handleCheckboxChange} />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleOpenModalA}>All Contacts</Button>
                        <Button variant="secondary" onClick={handleOpenModalB}>US Contacts</Button>
                        <Button variant="danger" onClick={handleCloseModalB}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Problem2;



