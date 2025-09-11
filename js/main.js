document.addEventListener('DOMContentLoaded', function () {
    const target = document.getElementById('typing-text');
    if (!target) return;

    // 表示したい単語のリスト
    const words = ['学生', 'Developer', 'Entrepreneur'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        let displayText = '';
        let timeout = 200; // タイピング速度

        if (isDeleting) {
            // 削除中の処理
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
            timeout = 100; // 削除速度
        } else {
            // タイピング中の処理
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        target.textContent = displayText;

        // 状態の切り替えロジック
        if (!isDeleting && charIndex === currentWord.length) {
            // 単語を最後までタイピングしたら、2秒待ってから削除開始
            isDeleting = true;
            timeout = 2000;
        } else if (isDeleting && charIndex === 0) {
            // 単語をすべて削除したら、次の単語へ
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            timeout = 500; // 次の単語までの待ち時間
        }

        setTimeout(type, timeout);
    }

    // アニメーション開始
    setTimeout(type, 500);
});
