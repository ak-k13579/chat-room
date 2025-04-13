
let chatRooms = [];

function renderRooms() {
  const html = chatRooms
    .map((room, idx) => {
      const isJoined = room.joined;
      return `
      <div class="flex justify-between items-center bg-white p-4 mb-2 rounded shadow" id="room-${idx}">
        <div>
          <strong>${room.name}</strong>
          <span class="text-sm text-gray-500">(created by ${
            room.creator
          })</span>
        </div>
        <div class="flex gap-2" id="buttons-${idx}">
          ${
            room.creator === room.username && !isJoined
              ? `
            <button onclick="editRoom(${idx})" class="text-blue-600">Edit</button>
            <button onclick="deleteRoom(${idx})" class="text-red-600">Delete</button>
          `
              : ""
          }
          ${
            !isJoined
              ? `
            <button onclick="joinRoom(${idx})" class="text-green-600">Join</button>
          `
              : `
            <button class="text-gray-400 cursor-not-allowed" disabled>Joined</button>
          `
          }
        </div>
      </div>
    `;
    })
    .join("");
  document.getElementById("room-list").innerHTML =
    html || '<p class="text-center text-gray-500">No chat rooms yet.</p>';
}

function addRoom(event) {
  event.preventDefault();
  const roomName = document.getElementById("roomName").value;
  const username = document.getElementById("username").value;

  if (roomName && username) {
    chatRooms.push({
      name: roomName,
      creator: username,
      username,
      joined: false,
    });
    renderRooms();
    event.target.reset();
  }
}

function editRoom(index) {
  const newName = prompt("Enter new room name:", chatRooms[index].name);
  if (newName) {
    chatRooms[index].name = newName;
    renderRooms();
  }
}

function deleteRoom(index) {
  if (confirm("Are you sure you want to delete this room?")) {
    chatRooms.splice(index, 1);
    renderRooms();
  }
}

function joinRoom(index) {
  chatRooms[index].joined = true;
  renderRooms();
}
