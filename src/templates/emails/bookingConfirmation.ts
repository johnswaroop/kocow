interface BookingConfirmationEmailProps {
  userName: string;
  spaceName: string;
  date: string;
  startTime: string;
  bookingId: string;
}

export const getBookingConfirmationEmail = ({
  userName,
  spaceName,
  date,
  startTime,
  bookingId,
}: BookingConfirmationEmailProps): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f3f4f6;
          }
          .header {
            background-color: #ffffff;
            padding: 30px;
            text-align: center;
            border-radius: 0.5rem;
            margin-bottom: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .header h1 {
            color: rgb(255, 70, 46);
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .content p {
            color: #4b5563;
            margin: 0 0 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #6b7280;
          }
          .booking-details {
            background-color: #f9fafb;
            padding: 20px;
            border-radius: 0.375rem;
            margin: 20px 0;
            border: 1px solid #e5e7eb;
          }
          .booking-details p {
            margin: 0 0 10px 0;
            display: flex;
            justify-content: space-between;
          }
          .booking-details strong {
            color: #1f2937;
            font-weight: 600;
          }
          .booking-details span {
            color: #4b5563;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: rgb(255, 70, 46);
            color: white;
            text-decoration: none;
            border-radius: 0.375rem;
            margin: 20px 0;
            font-weight: 500;
            text-align: center;
          }
          .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 20px 0;
          }
          .highlight {
            color: rgb(255, 70, 46);
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Booking Confirmation</h1>
        </div>
        
        <div class="content">
          <p>Dear <span class="highlight">${userName}</span>,</p>
          
          <p>Your booking has been confirmed! Here are the details of your reservation:</p>
          
          <div class="booking-details">
            <p>
              <strong>Space:</strong>
              <span>${spaceName}</span>
            </p>
            <p>
              <strong>Date:</strong>
              <span>${date}</span>
            </p>
            <p>
              <strong>Start Time:</strong>
              <span>${startTime}</span>
            </p>
            <p>
              <strong>Booking ID:</strong>
              <span>${bookingId}</span>
            </p>
          </div>
          
          <div class="divider"></div>
          
          <p>Please arrive on time for your booking. If you need to make any changes or have questions, please don't hesitate to contact us.</p>
          
          <p>Thank you for choosing our service!</p>
        </div>
        
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </body>
    </html>
  `;
};
