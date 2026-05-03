
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqhxfvhnjziwfkoplrcd.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaHhmdmhuanppd2Zrb3BscmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDUwNjEsImV4cCI6MjA2MjEyMTA2MX0.YY1a7TWhRQE2TMFaa6MVMeXKDFPmk_KcEupycK2bIAo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function getColumns() {
    // We can't directly get columns easily without RPC or info schema which might be blocked
    // But we can try to insert a minimal row and see the error or look at what's returned from a select
    const { data, error } = await supabase.from('rooms').select('*').limit(1);
    if (data && data.length > 0) {
        console.log('Columns:', Object.keys(data[0]));
    } else {
        console.log('Table is empty, trying to insert minimal row to see schema errors...');
        const { error: insError } = await supabase.from('rooms').insert([{ title: 'test' }]);
        console.log('Insert Error:', insError);
    }
}

getColumns();
