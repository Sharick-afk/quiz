document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/") {
        var customerContentList = document.querySelector(
                "#_customerShooseList"
            ),
            customerContentItems = document.querySelectorAll(
                "._customer-shoose_body_content"
            ),
            customerCurrentContentItem =
                customerContentList.getElementsByClassName(
                    "_customer-active"
                ),
            customerNextContentButton =
                document.querySelector("#_customerButton2"),
            customerPrevContentButton =
                document.querySelector("#_customerButton1"),
            customerCurrentProgress = 0,
            customerAllProgress = customerContentItems.length,
            customerCurrentProgressContainer = document.querySelector(
                "._customer-shoose_current_progress"
            ),
            customerAllProgressContainer = document.querySelector(
                "._customer-shoose_all_progress"
            ),
            customerWarnInfo = document.querySelector(
                "._customer-shoose_warn"
            );
        var currentActiveContent;
        function getCurrentContent() {
            customerContentItems.forEach((item, index) => {
                if (item.classList.contains("_customer-active")) {
                    return (currentActiveContent = index);
                }
            });
        }
        function nextContent() {
            getCurrentContent();
            if (currentActiveContent <= 5) {
                customerContentItems[
                    Number(currentActiveContent)
                ].classList.remove("_customer-active");

                customerContentItems[
                    Number(currentActiveContent) + 1
                ].classList.add("_customer-active");
            }
        }
        function prevContent() {
            getCurrentContent();
            if (currentActiveContent >= 1) {
                customerContentItems[
                    Number(currentActiveContent)
                ].classList.remove("_customer-active");

                customerContentItems[
                    Number(currentActiveContent) - 1
                ].classList.add("_customer-active");
            }
        }
        function nextStepValidation() {
            if (document.querySelector("._customer-active input:checked")) {
                customerNextContentButton.disabled = false;
            } else {
                customerNextContentButton.disabled = true;
            }
        }

        function showWarn() {
            if (
                document.querySelector(
                    "._customer-shoose_body_content_6._customer-active"
                ) ||
                document.querySelector(
                    "._customer-shoose_body_content_7._customer-active"
                )
            ) {
                customerWarnInfo.style.display = "none";
            } else {
                customerWarnInfo.style.display = "flex";
            }
        }
        function showCurrentProgress() {
            getCurrentContent();
            customerCurrentProgressContainer.innerHTML = `${
                Number(currentActiveContent) + 1
            }`;
        }
        function showAllProgress() {
            customerAllProgressContainer.innerHTML = `${customerContentItems.length}`;
        }
        customerNextContentButton.addEventListener("click", function () {
            if (!customerNextContentButton.disabled === true) {
                nextStepValidation();
                nextContent();
                showWarn();
                showCurrentProgress();
            }
            nextStepValidation();
        });
        customerPrevContentButton.addEventListener("click", function () {
            prevContent();
            showWarn();
            showCurrentProgress();
        });
        customerContentList.addEventListener("click", function () {
            nextStepValidation();
            showWarn();
            showCurrentProgress();
        });
        showWarn();
        showCurrentProgress();
        showAllProgress();
        nextStepValidation();
        const _customerSubmitButton =
            customerContentList.querySelector("#_customerSubmit");
        let _customerFinalMessage = "";
        function _customerSendForm() {
            if (_customerSubmitButton.disabled !== true) {
                var orderTextContent = "";
                document
                    .querySelectorAll(
                        "._customer-shoose_body_content_6 input:checked ~ label span"
                    )
                    .forEach(function (item) {
                        orderTextContent += item.textContent + ", ";
                    });
                var customerOrderDate = document.querySelector(
                    "._customer-shoose_body_content_2 input:checked ~ label"
                ).textContent;
                _customerFinalMessage = `Здравстуйте, я бы хотел(а) приобрести мини-трактор${customerOrderDate.toLocaleLowerCase()}\nМощность: ${
                    document.querySelector(
                        "._customer-shoose_body_content_1 input:checked~ label"
                    ).textContent
                }\nПримерная стоймость: ${
                    document.querySelector(
                        "._customer-shoose_body_content_3 input:checked~ label"
                    ).textContent
                }\nНужен ли ПСМ: ${
                    document.querySelector(
                        "._customer-shoose_body_content_4 input:checked~ label"
                    ).textContent
                },\nСпособ оплаты: ${
                    document.querySelector(
                        "._customer-shoose_body_content_5 input:checked~ label"
                    ).textContent
                },\nДополнительное оборудование: ${orderTextContent
                    .toLocaleLowerCase()
                    .substring(0, orderTextContent.length - 2)}.`;
            }
        }
        function openWidget() {
            _customerSendForm();
            setTimeout(() => {
                document.querySelector(
                    "#order_messages_attributes_0_text"
                ).value = _customerFinalMessage;
            }, 1000);
        }

        _customerSubmitButton.addEventListener("click", function (event) {
            openWidget();
        });
    }
});
