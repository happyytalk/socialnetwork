local http = require "net.http";
local json = require "util.json";

module:log("info", "Custom plugin loaded");

local function send_event(event_type, data)
    local payload = json.encode({
        event = event_type,
        room = data.room,
        nickname = data.nickname,
        username = data.username,
        token = data.token
    });

    http.request("http://localhost:5001/api/jitsi/activity", {
        method = "POST",
        body = payload,
        headers = {
            ["Content-Type"] = "application/json";
        }
    });
end

module:hook("muc-occupant-pre-join", function(event)
    local room_jid = event.room.jid;
    local occupant = event.occupant;
    local session = event.origin;

    local username = session.jitsi_meet_context_user and session.jitsi_meet_context_user.name or "Unknown";

    send_event("join", {
        room = room_jid,
        nickname = occupant.nick,
        username = username,
        token = session.auth_token or ""
    });

    module:log("info", "User joined: %s in room %s", username, room_jid);
end);

module:hook("muc-occupant-left", function(event)
    local room_jid = event.room.jid;
    local occupant = event.occupant;
    local session = occupant.session or {}; 

    local username = session.jitsi_meet_context_user and session.jitsi_meet_context_user.name or "Unknown";

    send_event("leave", {
        room = room_jid,
        nickname = occupant.nick,
        username = username,
        token = session.auth_token or ""
    });

    module:log("info", "User left: %s from room %s", username, room_jid);
end);
