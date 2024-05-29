const timeElement = document.getElementById('time');
const locationSelect = document.getElementById('location');

const timezones = moment.tz.names();

function populateLocations() {
    timezones.forEach((timezone) => {
        const option = document.createElement('option');
        option.value = timezone;
        option.textContent = timezone.replace('_', ' ');
        locationSelect.appendChild(option);
    });

    // Initialize Select2 for the dropdown
    $(document).ready(function () {
        $('#location').select2({
            placeholder: 'Select a city',
            allowClear: true,
            width: 'resolve'
        });
    });
}

function updateClock() {
    const selectedTimezone = locationSelect.value;
    const now = moment().tz(selectedTimezone);

    const hours = now.format('HH');
    const minutes = now.format('mm');
    const seconds = now.format('ss');

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function startClock() {
    populateLocations();
    locationSelect.value = 'UTC'; // Default to UTC
    updateClock();
    setInterval(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', startClock);
