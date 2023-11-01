 let initialPrices = {};

        function openCouponForm() {
            const couponForm = document.getElementById("coupon-form");
            couponForm.style.display = "block";

            // Сохраняем первоначальные цены
            const itemInfoElements = document.querySelectorAll(".item-info");
            itemInfoElements.forEach((element, index) => {
                const currentPriceText = element.textContent.match(/\$\d+(\.\d+)?/);
                if (currentPriceText) {
                    const currentPrice = parseFloat(currentPriceText[0].substring(1));
                    initialPrices[index] = currentPrice;
                }
            });
        }

        function applyCoupon() {
            const couponPercentInput = document.getElementById("coupon-percent");
            const couponPercent = parseInt(couponPercentInput.value, 10);

            if (!isNaN(couponPercent) && couponPercent >= 0 && couponPercent <= 99) {
                const itemInfoElements = document.querySelectorAll(".item-info");
                itemInfoElements.forEach((element, index) => {
                    // Применить скидку и обновить текст элемента
                    const currentPriceText = element.textContent.match(/\$\d+(\.\d+)?/);
                    if (currentPriceText) {
                        const currentPrice = initialPrices[index];
                        const discountedPrice = currentPrice - (currentPrice * couponPercent / 100);
                        element.textContent = `\$${discountedPrice.toFixed(2)}`;
                    }
                });

                const couponMessage = `Discount of ${couponPercent}% applied successfully!`;
                document.getElementById("coupon-message").textContent = couponMessage;
            } else {
                const couponMessage = "Please enter a valid discount percentage (0-99).";
                document.getElementById("coupon-message").textContent = couponMessage;
            }
        }

        function resetPrices() {
            const itemInfoElements = document.querySelectorAll(".item-info");
            itemInfoElements.forEach((element, index) => {
                // Восстановить первоначальные цены
                if (initialPrices[index] !== undefined) {
                    const currentPrice = initialPrices[index];
                    element.textContent = `\$${currentPrice.toFixed(2)}`;
                }
            });
        }