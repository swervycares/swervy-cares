export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const volunteerRequest = JSON.parse(event.body);
    
    // Log the request (in production, you'd save to a database)
    console.log('Volunteer request received:', volunteerRequest);
    
    // For now, just return success
    // In production, you'd integrate with your database and email service
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ 
        message: 'Volunteer application submitted successfully',
        id: Date.now().toString()
      })
    };
  } catch (error) {
    console.error('Volunteer request error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};