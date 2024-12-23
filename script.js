document.addEventListener('DOMContentLoaded', () => {
    fetchLeads();
  
    // Handle lead form submission
    document.getElementById('leadForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const newLead = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        contact_number: document.getElementById('contact_number').value,
        status: document.getElementById('status').value,
        assigned_kam: document.getElementById('assigned_kam').value,
      };
  
      console.log('Submitting new lead:', newLead);
  
      try {
        const response = await fetch('http://localhost:3000/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLead),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add lead');
        }
  
        console.log('Lead added successfully');
        alert('Lead added successfully!');
        document.getElementById('leadForm').reset();
        fetchLeads();
      } catch (err) {
        console.error('Error adding lead:', err);
        alert('An error occurred while adding the lead.');
      }
    });
  });
  
  // Fetch all leads and display them
  async function fetchLeads() {
    try {
      const response = await fetch('http://localhost:3000/api/leads');
      const leads = await response.json();
  
      console.log('Fetched leads:', leads);
  
      let leadTable = `
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Assigned KAM</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      leads.forEach(lead => {
        leadTable += `
          <tr>
            <td>${lead.id}</td>
            <td>${lead.name}</td>
            <td>${lead.address}</td>
            <td>${lead.contact_number}</td>
            <td>${lead.status}</td>
            <td>${lead.assigned_kam}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="deleteLead(${lead.id})">Delete</button>
            </td>
          </tr>
        `;
      });
  
      leadTable += `</tbody></table>`;
      document.getElementById('lead-table-container').innerHTML = leadTable;
    } catch (err) {
      console.error('Error fetching leads:', err);
      document.getElementById('lead-table-container').innerHTML =
        '<p class="text-danger">Failed to load leads. Please try again later.</p>';
    }
  }
  
  // Delete a lead
  async function deleteLead(id) {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/leads/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete lead');
        }
  
        alert('Lead deleted successfully!');
        fetchLeads();
      } catch (err) {
        console.error('Error deleting lead:', err);
        alert('An error occurred while deleting the lead.');
      }
    }
  }
  