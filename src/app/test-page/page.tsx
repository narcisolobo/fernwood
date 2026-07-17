import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

function Home() {
  return (
    <>
      <div className="navbar bg-base-100 border-base-300 border-b px-4">
        <div className="flex-1">
          <span className="font-display text-2xl tracking-wide">Neon Core</span>
          <span className="badge badge-primary badge-sm ml-3">
            DaisyUI test page
          </span>
        </div>
        <div className="flex-none">
          <ThemeSwitcher />
        </div>
      </div>

      <main className="mx-auto max-w-4xl space-y-12 px-4 py-10">
        <section>
          <h1 className="font-display mb-2 text-4xl">Buttons</h1>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-accent">Accent</button>
            <button className="btn btn-neutral">Neutral</button>
            <button className="btn btn-info">Info</button>
            <button className="btn btn-success">Success</button>
            <button className="btn btn-warning">Warning</button>
            <button className="btn btn-error">Error</button>
            <button className="btn btn-outline btn-primary">Outline</button>
            <button className="btn btn-ghost">Ghost</button>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-2 text-3xl">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-accent">Accent</span>
            <span className="badge badge-info">Info</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-error">Error</span>
            <span className="badge badge-outline">Outline</span>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-4 text-3xl">Alerts</h2>
          <div className="space-y-2">
            <div className="alert alert-info">
              <span>New class added to tomorrow&apos;s schedule.</span>
            </div>
            <div className="alert alert-success">
              <span>Membership payment successful.</span>
            </div>
            <div className="alert alert-warning">
              <span>Waitlist is nearly full for the 6pm Reformer class.</span>
            </div>
            <div className="alert alert-error">
              <span>Failed to check in — card declined.</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-4 text-3xl">Stats</h2>
          <div className="stats bg-base-200 w-full shadow">
            <div className="stat">
              <div className="stat-title">Active Members</div>
              <div className="stat-value text-primary">312</div>
              <div className="stat-desc">↗︎ 12 this month</div>
            </div>
            <div className="stat">
              <div className="stat-title">Classes This Week</div>
              <div className="stat-value text-secondary">48</div>
              <div className="stat-desc">6 instructors</div>
            </div>
            <div className="stat">
              <div className="stat-title">Avg. Attendance</div>
              <div className="stat-value text-accent">86%</div>
              <div className="stat-desc">↗︎ 4% vs last week</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-4 text-3xl">Cards</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">Reformer Flow</h3>
                <p>A dynamic, full-body class on the reformer.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">Book</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">Mat Pilates</h3>
                <p>Classic mat work focused on core control.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary btn-sm">Book</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">Sculpt &amp; Tone</h3>
                <p>Light resistance work paired with cardio bursts.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-accent btn-sm">Book</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-4 text-3xl">Form Elements</h2>
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body space-y-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Full name</span>
                </div>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Membership tier</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  defaultValue="drop-in"
                >
                  <option value="drop-in">Drop-in</option>
                  <option value="monthly">Monthly Unlimited</option>
                  <option value="annual">Annual</option>
                </select>
              </label>

              <div className="flex flex-wrap items-center gap-6">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">Email reminders</span>
                </label>

                <label className="label cursor-pointer gap-2">
                  <span className="label-text">Auto-renew</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="toggle toggle-secondary"
                  />
                </label>

                <div className="flex items-center gap-3">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="plan-radio"
                      className="radio radio-accent"
                      defaultChecked
                    />
                    <span className="label-text">Solo</span>
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="plan-radio"
                      className="radio radio-accent"
                    />
                    <span className="label-text">Duo</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="label">
                  <span className="label-text">Class intensity</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={60}
                  className="range range-primary"
                />
              </div>

              <div>
                <div className="label">
                  <span className="label-text">Studio capacity</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={70}
                  max={100}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-4 text-3xl">Loading &amp; Misc</h2>
          <div className="flex flex-wrap items-center gap-4">
            <span className="loading loading-spinner loading-sm text-primary" />
            <span className="loading loading-dots loading-md text-secondary" />
            <span className="loading loading-ring loading-lg text-accent" />
            <div className="tooltip" data-tip="Neon Core">
              <button className="btn btn-sm">Hover me</button>
            </div>
            <label htmlFor="test-modal" className="btn btn-sm btn-outline">
              Open modal
            </label>
          </div>
        </section>
      </main>

      <input type="checkbox" id="test-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-display text-2xl">Class booked!</h3>
          <p className="py-4">
            This is a DaisyUI modal, styled with the current theme.
          </p>
          <div className="modal-action">
            <label htmlFor="test-modal" className="btn btn-primary">
              Close
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="test-modal">
          Close
        </label>
      </div>
    </>
  );
}

export default Home;
