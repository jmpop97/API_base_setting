read_d()

function create_d() {

    let m_img = "A"
    let formData = new FormData();

    formData.append("m_img_give", m_img);


    fetch('/member', { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
        });
};

function read_d() {

    fetch('/members').then((res) => res.json()).then((data) => {
        let rows = data['result']
        console.log(rows)
        //버튼지우기
        document.getElementById('copybutton').innerHTML = ""
        //저장 읽기 생성
        temp_button = `<button onclick="create_d()">저장</button>
        <button onclick="read_d()">읽기</button>`
        document.getElementById('copybutton').insertAdjacentHTML("beforeend", temp_button)

        rows.forEach((a) => {
            let m_id = a['_id']['$oid']
            let m_img = a['m_img']

            let temp_button = `<p>
            ${m_img}
            <button onclick="delete_d('${m_id}')">삭제</button>
            <button onclick="update_d('${m_id}')">수정</button>
            </p>`
            document.getElementById('copybutton').insertAdjacentHTML("beforeend", temp_button)

        }

        )
    })
};

function delete_d(id) {

    let m_id = id

    let formData = new FormData();
    formData.append("m_id_give", m_id);

    fetch('/member', { method: "DELETE", body: formData }).then((res) => res.json()).then((data) => {
        location.reload(true);
        alert(data['msg']);
    })
};

function update_d(id) {
    let m_id = id
    let m_img = "change image"

    let formData = new FormData();
    formData.append("m_id_give", m_id);
    formData.append("m_img_give", m_img);

    fetch('/member', { method: "PUT", body: formData }).then((res) => res.json()).then((data) => {
        location.reload(true);
        // alert(data['수정 완료']);
    })
};



