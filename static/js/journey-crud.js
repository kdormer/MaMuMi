/*
 * Handle CRUD operations for Journeys within admin dashboard
*/
(function() {
    'use strict';

    let _btnPressCount = 0;
    let _createBtn;
    let _listPane;
    let _creationPane;
    let _creationForm;
    let _tableContainer;
    let _journeyList;

    document.addEventListener('DOMContentLoaded', () => {
        _createBtn = document.getElementById('create-btn');
        _listPane = document.getElementById('journey-list');
        _creationPane = document.getElementById('create-journey');
        _creationForm = document.querySelector('#create-journey form');
        _tableContainer = document.querySelector('.table-responsive');
        _journeyList = document.querySelector('#journey-list tbody');

        _displayJourneys();
        _createBtn.addEventListener('click', _altPane);
    });

    async function _getJourneys() {
        return await (await fetch('/journeys')).json();
    }

    async function _getJourney(id) {
        return await (await fetch(`/journeys/${id}`)).json();
    }

    async function _sendJourney(journeyObj) {
        fetch('/journeys', {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(journeyObj)
        }).then((res) => {
            alert('Journey created!');
        }).catch((error) => {
           alert('Journey creation failed!');
        })
    }

    async function _updateJourney(journeyID, journeyObj) {
        fetch(`/journeys/${journeyID}/update`, {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(journeyObj)
        }).then((res) => {
            alert('Journey successfully updated!');
        }).catch((error) => {
            alert('Journey update failed!');
        })
    }

    async function _deleteJourney(journeyID) {
        fetch(`/journeys/${journeyID}/delete`, {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {}
        }).then((res) => {
            alert('Journey deleted!');
        }).catch((error) => {
            alert('Journey deletion failed!');
        })
    }

    function _displayJourneys() {
        _getJourneys().then(journeys => {
            if(journeys.length > 0) {  
            } else {
                _tableContainer.innerText = 'No journeys added yet. Let\'s get started!';
            }
        })
    }

    function _altPane(event) {
        if(!(++_btnPressCount % 2 == 0)) {
            // Odd
            _createBtn.innerText = 'List';
            _creationPane.classList.add('active-pane');
            _listPane.classList.remove('active-pane');

        } else {
            // Even
            _createBtn.innerText = 'Create';
            _creationPane.classList.remove('active-pane');
            _listPane.classList.add('active-pane');
        }

        event.preventDefault();
    }
})();