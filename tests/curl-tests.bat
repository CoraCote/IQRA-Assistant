@echo off
REM IQRA Assistant API Tests for Windows
REM Make sure the backend is running on http://localhost:3000

set BASE_URL=http://localhost:3000
echo Testing IQRA Assistant API at %BASE_URL%
echo ========================================

REM Test 1: Health Check
echo.
echo 1. Testing Health Check...
curl -X GET "%BASE_URL%/health" -H "Content-Type: application/json"

REM Test 2: Get Menu
echo.
echo 2. Testing Get Menu...
curl -X GET "%BASE_URL%/menu" -H "Content-Type: application/json"

REM Test 3: Draft Order
echo.
echo 3. Testing Draft Order...
curl -X POST "%BASE_URL%/order/draft" -H "Content-Type: application/json" -d "{\"customer_input\": \"I would like a large pepperoni pizza with extra cheese\", \"menu_items\": [{\"id\": \"pizza-1\", \"name\": \"Pepperoni Pizza\", \"description\": \"Classic pepperoni pizza\", \"base_price\": 14.99, \"category\": \"Pizza\", \"available\": true, \"created_at\": \"2024-01-01T00:00:00Z\", \"updated_at\": \"2024-01-01T00:00:00Z\"}], \"menu_modifiers\": [{\"id\": \"size-large\", \"name\": \"Large (14\\\")\", \"price_adjustment\": 3.00, \"modifier_group\": \"Size\", \"available\": true, \"created_at\": \"2024-01-01T00:00:00Z\", \"updated_at\": \"2024-01-01T00:00:00Z\"}, {\"id\": \"extra-cheese\", \"name\": \"Extra Cheese\", \"price_adjustment\": 2.00, \"modifier_group\": \"Toppings\", \"available\": true, \"created_at\": \"2024-01-01T00:00:00Z\", \"updated_at\": \"2024-01-01T00:00:00Z\"}]}"

REM Test 4: Commit Order
echo.
echo 4. Testing Commit Order...
curl -X POST "%BASE_URL%/order/commit" -H "Content-Type: application/json" -d "{\"order\": {\"customer_name\": \"John Doe\", \"customer_phone\": \"+1234567890\", \"items\": [{\"menu_item_id\": \"pizza-1\", \"quantity\": 1, \"modifiers\": [{\"modifier_id\": \"size-large\", \"quantity\": 1}, {\"modifier_id\": \"extra-cheese\", \"quantity\": 1}], \"special_instructions\": \"Well done\"}], \"total_amount\": 19.99, \"status\": \"draft\", \"special_instructions\": \"Please deliver to the back door\"}}"

REM Test 5: Send SMS
echo.
echo 5. Testing Send SMS...
curl -X POST "%BASE_URL%/sms/send" -H "Content-Type: application/json" -d "{\"to\": \"+1234567890\", \"message\": \"Thank you for your order! Your pizza will be ready in 20-30 minutes.\"}"

REM Test 6: Log Transcript
echo.
echo 6. Testing Transcript Intake...
curl -X POST "%BASE_URL%/transcript/intake" -H "Content-Type: application/json" -d "{\"session_id\": \"session-123\", \"customer_phone\": \"+1234567890\", \"transcript_text\": \"Customer: I would like a large pepperoni pizza with extra cheese. Assistant: Great choice! That will be $19.99. Customer: Perfect, please make it well done.\", \"order_id\": \"order-456\"}"

REM Test 7: Get Metrics
echo.
echo 7. Testing Get Metrics...
curl -X GET "%BASE_URL%/admin/metrics" -H "Content-Type: application/json"

REM Test 8: Tools Health Check
echo.
echo 8. Testing Tools Health Check...
curl -X GET "%BASE_URL%/tools/health" -H "Content-Type: application/json"

echo.
echo ========================================
echo All tests completed!
pause

