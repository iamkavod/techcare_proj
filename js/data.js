document.addEventListener('DOMContentLoaded', function () {
 const username = 'coalition';
 const password = 'skills-test';
 const authKey = btoa(`${username}:${password}`);

 fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
     headers: {
         'Authorization': `Basic ${authKey}`
     }
 })
 .then(response => {
     if (!response.ok) {
         throw new Error(`Network response was not ok ${response.statusText}`);
     }
     return response.json();
 })
 .then(data => {
     console.log(data);
     const jessica = data.find(person => person.name === 'Jessica Taylor');

     if (jessica) {
         // Profile Information
         updateElementContent('name', jessica.name);
         updateElementContent('gender', jessica.gender);
         updateElementContent('age', jessica.age);
         updateElementContent('dob', jessica.date_of_birth);
         updateElementContent('phone', jessica.phone_number);
         updateElementContent('emergency-contact', jessica.emergency_contact);
         updateElementContent('insurance', jessica.insurance_type);
         updateElementSrc('profile-picture', jessica.profile_picture);

         // Diagnosis History
         jessica.diagnosis_history.forEach((diagnosis, index) => {
             updateElementContent(`diagnosis-month-${index}`, diagnosis.month);
             updateElementContent(`diagnosis-year-${index}`, diagnosis.year);
             updateElementContent(`bp-systolic-value-${index}`, diagnosis.blood_pressure.systolic.value);
             updateElementContent(`bp-diastolic-value-${index}`, diagnosis.blood_pressure.diastolic.value);
             updateElementContent(`bp-systolic-levels-${index}`, diagnosis.blood_pressure.systolic.levels);
             updateElementContent(`bp-diastolic-levels-${index}`, diagnosis.blood_pressure.diastolic.levels);
             updateElementContent(`heart-rate-value-${index}`, diagnosis.heart_rate.value);
             updateElementContent(`heart-rate-levels-${index}`, diagnosis.heart_rate.levels);
             updateElementContent(`respiratory-rate-value-${index}`, diagnosis.respiratory_rate.value);
             updateElementContent(`respiratory-rate-levels-${index}`, diagnosis.respiratory_rate.levels);
             updateElementContent(`temperature-value-${index}`, diagnosis.temperature.value);
             updateElementContent(`temperature-levels-${index}`, diagnosis.temperature.levels);
         });

         // Diagnostic List
         jessica.diagnostic_list.forEach((diagnostic, index) => {
             updateElementContent(`diagnostic-name-${index}`, diagnostic.name);
             updateElementContent(`diagnostic-description-${index}`, diagnostic.description);
             updateElementContent(`diagnostic-status-${index}`, diagnostic.status);
         });

         // Lab Results
         jessica.lab_results.forEach((result, index) => {
             updateElementContent(`lab-result-${index}`, result);
         });
     } else {
         document.getElementById('profile').innerText = "Jessica Taylor's details not found.";
     }
 })
 .catch(error => console.error('Error fetching data:', error));
});

function updateElementContent(id, content) {
 const element = document.getElementById(id);
 if (element) {
     element.textContent = content;
 } else {
     console.warn(`Element with ID ${id} not found.`);
 }
}

function updateElementSrc(id, src) {
 const element = document.getElementById(id);
 if (element) {
     element.src = src;
 } else {
     console.warn(`Element with ID ${id} not found.`);
 }
}
