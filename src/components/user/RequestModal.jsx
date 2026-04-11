import { IoClose } from "react-icons/io5";

const RequestModal = ({ order, onClose }) => {
  const isRejected = order.status === "REJECTED";
  const isApproved = order.status === "APPROVED";

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      />

      {/* MODAL WRAPPER */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">

        <div className="
          w-full max-w-2xl 
          bg-[#0d1128] border border-white/10 
          rounded-2xl shadow-2xl
          flex flex-col
          max-h-[85vh]
        ">

          {/* HEADER (FIXED STYLE) */}
          <div className="flex justify-between items-start p-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white">
                {order.companyName || "Company"}
              </h2>
              <p className="text-xs text-white/50">
                Order #{order.id}
              </p>
            </div>

            <IoClose
              className="text-2xl cursor-pointer hover:text-red-400 transition"
              onClick={onClose}
            />
          </div>

          {/* BODY (ONLY THIS SCROLLS IF NEEDED) */}
          <div className="p-6 space-y-4 overflow-y-auto">

            {/* BASIC INFO */}
            <div className="space-y-2 text-sm text-white/80">
              <p><b>Service Type:</b> {order.serviceType || "N/A"}</p>
              <p><b>Client Amount:</b> ${order.orderAmount}</p>

              <p>
                <b>Status:</b>{" "}
                <span className={`
                  font-semibold
                  ${isRejected ? "text-red-400"
                    : isApproved ? "text-green-400"
                    : "text-yellow-400"}
                `}>
                  {order.status}
                </span>
              </p>
            </div>

            {/* ADMIN RESPONSE */}
            {(order.adminPrice || order.adminDeadline || order.adminDescription) && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-white font-semibold mb-2">
                  Admin Response
                </h3>

                <p><b>Price:</b> ${order.adminPrice || "Not set"}</p>
                <p><b>Deadline:</b> {order.adminDeadline || "Not set"}</p>
                <p><b>Description:</b> {order.adminDescription || "No message"}</p>
              </div>
            )}

            {/* APPROVED */}
            {isApproved && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <h3 className="text-green-400 font-semibold mb-2">
                  ✅ Successfully Approved
                </h3>
                <p className="text-sm text-green-300">
                  Your project has been accepted and is now in progress.
                </p>
              </div>
            )}

            {/* REJECTED (FIXED UI) */}
            {isRejected && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <h3 className="text-red-400 font-semibold mb-2">
                  ❌ Order Rejected
                </h3>

                <p className="text-sm text-red-300">
                  {order.adminDescription || "Admin did not approve this request."}
                </p>

                <p className="text-xs text-white/40 mt-2">
                  Please review details and try again.
                </p>
              </div>
            )}

            {/* CASHBACK SAFE */}
            {order.cashback?.cashbackAmount !== undefined && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                <b>Cashback:</b> ${order.cashback.cashbackAmount} (
                {order.cashback.cashbackPercent}%)
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-5 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default RequestModal;