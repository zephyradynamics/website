import type { Metadata } from 'next';
import BlogArticle from '@/components/BlogArticle';

export const metadata: Metadata = {
  title: 'FlightLab: Building a Traceable SITL Platform for Kestrel Development',
  description:
    'How Zephyra Dynamics built FlightLab to support repeatable simulation, testing and traceable engineering evidence for Kestrel development.',
  alternates: { canonical: '/blogs/flightlab' },
};

export default function FlightLabBlogPage() {
  return (
    <BlogArticle
      category="Flight Validation"
      title="FlightLab: building a traceable SITL platform for Kestrel development"
      summary="A closer look at the simulation and evidence workflow supporting Kestrel development."
      articlePath="/blogs/flightlab"
      image="/image/Flight Lab (1).png"
      imageAlt="FlightLab simulation and validation environment"
      imageWidth={1672}
      imageHeight={941}
    >
      <p>
        Zephyra Dynamics has spent the last development cycle building the tooling layer around our
        Kestrel X2 flight control stack. That tooling is FlightLab, a simulation engineering
        application that brings the flight simulation engine, software-in-the-loop testing and our
        ground control interface into a single, repeatable workflow. This article explains what it
        does, how it is structured and what it deliberately does not claim to do.
      </p>

      <h2>What FlightLab actually is</h2>
      <p>
        FlightLab is an orchestration and evidence layer, not a flight controller. Its role is to make
        the wider simulation environment practical for daily engineering work by coordinating test
        sessions, defining missions, applying conditions, introducing controlled scenarios, capturing
        flight data and assembling the results into a reviewable record.
      </p>
      <p>
        A favourable trajectory or passing result is only one observation. Its value depends on the
        quality of the model, the definition of the inputs, the completeness of the captured data,
        repeatability and traceability to a real requirement. FlightLab is designed around that
        principle. The workflow exists to produce evidence, not simply a demonstration.
      </p>

      <h2>How the workflow fits together</h2>
      <p>
        FlightLab coordinates the aircraft simulation, flight control environment and ground control
        interface while keeping their responsibilities separate. Simulated aircraft behaviour and
        sensor information move through the test environment, while telemetry supports mission review,
        observation and analysis.
      </p>
      <p>
        Mission construction, flight monitoring, controlled test scenarios and evidence reporting are
        handled as distinct parts of the workflow. Connections are established for each session so
        that a previous setup is not silently treated as the current test configuration. This matters
        when repeatability is the objective.
      </p>

      <h2>Core capabilities</h2>
      <p>
        <strong>Mission definition.</strong> A library of mission presets supports repeatable flight
        profiles, while custom routes allow engineers to investigate specific operating cases.
      </p>
      <p>
        <strong>Trajectory evaluation.</strong> Engineers can compare changes in aircraft response,
        path tracking and flight smoothness across controlled simulation runs.
      </p>
      <p>
        <strong>Operating conditions.</strong> Loading and environmental inputs can be varied, with
        requested and confirmed conditions recorded separately so an unconfirmed setup is not treated
        as a successful test.
      </p>
      <p>
        <strong>Controlled scenarios.</strong> The platform supports repeatable investigation of
        selected system and sensor conditions, followed by recorded recovery observations.
      </p>
      <p>
        <strong>Campaign management.</strong> Related cases can be organised into persistent test
        campaigns with their objectives, conditions, repetitions and results kept together.
      </p>
      <p>
        <strong>Analysis and comparison.</strong> Flight records can be reviewed against defined
        criteria and compared with earlier runs to identify changes that need engineering attention.
      </p>
      <p>
        <strong>Evidence management.</strong> Each session produces a structured record containing the
        test context, relevant artifacts and report references so that the work can be reviewed later.
      </p>

      <h2>Where we have drawn the line deliberately</h2>
      <p>
        Simulation evidence must be interpreted within the limits of the model and the test setup. A
        successful scenario does not, by itself, establish the behaviour of every physical aircraft
        system or prove readiness for operation.
      </p>
      <p>
        A passing recovery test records the outcome of that defined test sequence. It does not, on its
        own, demonstrate complete autonomous fault detection and response. Claims of that kind require
        separate tests designed specifically to establish the behaviour without imposing the result.
      </p>
      <p>
        FlightLab does not establish regulatory compliance, assign development assurance levels or
        replace formal safety assessment. It produces simulation evidence that can support those
        processes when suitable model validation, acceptance criteria and independent review are in
        place.
      </p>

      <h2>Why we built it this way</h2>
      <p>
        Simulation tooling is easy to over-trust. A polished interface and a passing result can appear
        to provide more assurance than they actually do. FlightLab is built to resist that tendency by
        keeping each result connected to a specific test, preserving the context around the run and
        leaving a record that another engineer can review.
      </p>
      <p>
        That is the engineering philosophy behind FlightLab. It is a tool for building trustworthy
        evidence, not a shortcut around the work required to earn that trust.
      </p>
    </BlogArticle>
  );
}
