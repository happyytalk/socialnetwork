
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqhxfvhnjziwfkoplrcd.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaHhmdmhuanppd2Zrb3BscmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDUwNjEsImV4cCI6MjA2MjEyMTA2MX0.YY1a7TWhRQE2TMFaa6MVMeXKDFPmk_KcEupycK2bIAo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRooms() {
    const { data, error, count } = await supabase
        .from('rooms')
        .select('*', { count: 'exact' });

    if (error) {
        console.error('Error:', error);
    } else {
        console.log(`Total rooms in DB: ${count}`);
        console.log('Rooms:', JSON.stringify(data, null, 2));
    }
}

checkRooms();
