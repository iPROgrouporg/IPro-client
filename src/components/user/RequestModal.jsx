import { IoClose } from "react-icons/io5";

const RequestModal = ({ order, onClose }) => {

  const isPending = order.status === "PENDING";
  const isApproved = order.status === "APPROVED";
  const isRejected = order.status === "REJECTED";

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">

        <div className="w-full max-w-2xl bg-[#0d1128] border border-white/10 rounded-2xl max-h-[85vh] flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold">
                {order.companyName}
              </h2>
              <p className="text-xs text-white/50">
                Order #{order.id}
              </p>
            </div>

            <IoClose
              className="text-2xl cursor-pointer hover:text-red-400"
              onClick={onClose}
            />
          </div>

          {/* BODY */}
          <div className="p-6 space-y-4 overflow-y-auto">

            {/* BASIC INFO */}
            <div className="text-sm space-y-2 text-white/80">

              <p><b>Amount:</b> ${order.orderAmount}</p>

              <p>
                <b>Status:</b>{" "}
                <span className={
                  isApproved ? "text-green-400"
                  : isRejected ? "text-red-400"
                  : "text-yellow-400"
                }>
                  {order.status}
                </span>
              </p>

            </div>

            {/* PENDING STATE */}
            {isPending && (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                <h3 className="text-yellow-400 font-semibold">
                  ⏳ Order is in review
                </h3>
                <p className="text-sm text-white/60">
                  Admin hali javob bermagan.
                </p>
              </div>
            )}

            {/* ADMIN RESPONSE */}
            {(order.adminPrice || order.adminDeadline || order.adminDescription) && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">

                <h3 className="font-semibold mb-2">
                  Admin Response
                </h3>

                <p><b>Price:</b> ${order.adminPrice || "-"}</p>
                <p><b>Deadline:</b> {order.adminDeadline || "-"}</p>
                <p><b>Description:</b> {order.adminDescription || "-"}</p>

              </div>
            )}

            {/* APPROVED */}
            {isApproved && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <h3 className="text-green-400 font-semibold">
                  ✅ Approved
                </h3>

                <p className="text-sm text-green-300">
                  Your order has been accepted.
                </p>

                <p className="text-sm mt-2">
                  Cashback used: <b>{order.cashbackUsed || 0}$</b>
                </p>

                <p className="text-sm">
                  Remaining: <b>{order.cashRemaining || 0}$</b>
                </p>
              </div>
            )}

            {/* REJECTED */}
            {isRejected && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <h3 className="text-red-400 font-semibold">
                  ❌ Rejected
                </h3>

                <p className="text-sm text-red-300">
                  {order.adminDescription || "No reason provided"}
                </p>

                <p className="text-xs text-white/40 mt-2">
                  Please update and try again.
                </p>
              </div>
            )}

            {/* CASHBACK */}
            {order.cashbackUsed > 0 && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                Cashback used: <b>{order.cashbackUsed}$</b>
              </div>
            )}

          </div>

          {/* FOOTER */}
          <div className="p-5 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20"
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